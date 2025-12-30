"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XrayService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const xray_entity_1 = require("./entities/xray.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ai_analysis_service_1 = require("../ai-analysis/ai-analysis.service");
let XrayService = class XrayService {
    xrayRepository;
    userRepository;
    aiAnalysisService;
    constructor(xrayRepository, userRepository, aiAnalysisService) {
        this.xrayRepository = xrayRepository;
        this.userRepository = userRepository;
        this.aiAnalysisService = aiAnalysisService;
    }
    async uploadXray(file, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const xray = this.xrayRepository.create({
            imageUrl: file.filename,
            originalName: file.originalname,
            patient: user,
            patientId: userId,
        });
        const savedXray = await this.xrayRepository.save(xray);
        this.aiAnalysisService.analyzeXray(savedXray.id).catch(err => {
            console.error(`Auto-analysis failed for Xray ${savedXray.id}:`, err);
        });
        return savedXray;
    }
    async findAllByPatient(patientId) {
        return this.xrayRepository.find({
            where: { patientId },
            relations: ['aiReport'],
            order: { uploadedAt: 'DESC' },
        });
    }
    async findOne(id) {
        const xray = await this.xrayRepository.findOne({
            where: { id },
            relations: ['aiReport', 'patient', 'patient.patientProfile'],
        });
        if (!xray) {
            throw new common_1.NotFoundException('X-Ray not found');
        }
        return xray;
    }
};
exports.XrayService = XrayService;
exports.XrayService = XrayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(xray_entity_1.XRay)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        ai_analysis_service_1.AiAnalysisService])
], XrayService);
//# sourceMappingURL=xray.service.js.map