"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XrayModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const xray_service_1 = require("./xray.service");
const xray_controller_1 = require("./xray.controller");
const xray_entity_1 = require("./entities/xray.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ai_analysis_module_1 = require("../ai-analysis/ai-analysis.module");
const xray_annotation_entity_1 = require("./entities/xray-annotation.entity");
let XrayModule = class XrayModule {
};
exports.XrayModule = XrayModule;
exports.XrayModule = XrayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([xray_entity_1.XRay, user_entity_1.User, xray_annotation_entity_1.XrayAnnotation]),
            ai_analysis_module_1.AiAnalysisModule
        ],
        controllers: [xray_controller_1.XrayController],
        providers: [xray_service_1.XrayService],
    })
], XrayModule);
//# sourceMappingURL=xray.module.js.map