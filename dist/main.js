"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    try {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Kopi API Service')
            .setDescription('Dokumentasi API Tugas Akhir')
            .setVersion('1.0')
            .addBearerAuth()
            .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document);
        logger.log('✅ Swagger berhasil dipasang di /api/docs');
    }
    catch (e) {
        logger.error('❌ Gagal pasang Swagger', e);
    }
    const port = 3000;
    await app.listen(port);
    const url = await app.getUrl();
    logger.log(`🚀 Application is running on: ${url}`);
    logger.log(`📄 BUKA INI DI BROWSER: ${url}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map