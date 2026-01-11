import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap'); 
  
  app.enableCors(); 
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  // --- SWAGGER START ---
  try {
    const config = new DocumentBuilder()
      .setTitle('Kopi API Service')
      .setDescription('Dokumentasi API Tugas Akhir')
      .setVersion('1.0')
      .addBearerAuth()
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
      .build();
      
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log('✅ Swagger berhasil dipasang di /api/docs');
  } catch (e) {
    logger.error('❌ Gagal pasang Swagger', e);
  }
  // --- SWAGGER END ---

  const port = 3000;


  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Application is running on port: ${port}`);
  logger.log(`📄 SWAGGER UTAMA: http://localhost:${port}/api/docs`);
  logger.log(`📄 SWAGGER ALTERNATIF: http://127.0.0.1:${port}/api/docs`);
}
bootstrap();