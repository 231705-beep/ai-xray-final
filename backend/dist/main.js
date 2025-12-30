"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3000;
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    await app.listen(port);
    console.log(`========================================`);
    console.log(`Backend Server is running on port: ${port}`);
    console.log(`Environment PORT variable: ${configService.get('PORT')}`);
    console.log(`CORS enabled for all origins.`);
    console.log(`========================================`);
}
bootstrap();
//# sourceMappingURL=main.js.map