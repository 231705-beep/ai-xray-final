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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalCaseReference = void 0;
const typeorm_1 = require("typeorm");
const ai_report_entity_1 = require("./ai-report.entity");
let MedicalCaseReference = class MedicalCaseReference {
    id;
    caseIdNum;
    xrayType;
    specialization;
    disease;
    description;
    imagePath;
    riskLevel;
};
exports.MedicalCaseReference = MedicalCaseReference;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MedicalCaseReference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MedicalCaseReference.prototype, "caseIdNum", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalCaseReference.prototype, "xrayType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalCaseReference.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalCaseReference.prototype, "disease", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], MedicalCaseReference.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MedicalCaseReference.prototype, "imagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ai_report_entity_1.RiskLevel,
        default: ai_report_entity_1.RiskLevel.LOW
    }),
    __metadata("design:type", String)
], MedicalCaseReference.prototype, "riskLevel", void 0);
exports.MedicalCaseReference = MedicalCaseReference = __decorate([
    (0, typeorm_1.Entity)()
], MedicalCaseReference);
//# sourceMappingURL=medical-case-reference.entity.js.map