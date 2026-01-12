import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS (Wajib buat Frontend)
  app.enableCors();

  // 2. Pasang Prefix 'api' 
  app.setGlobalPrefix('api');

  // 3. Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('Coffee API Service')
    .setDescription('Dokumentasi API')
    .setVersion('1.0')
    .addBearerAuth() // Fitur Gembok Token
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key') // Fitur Gembok API Key
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); 

  await app.listen(3000);
}
bootstrap();