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
exports.AIReport = exports.RiskLevel = void 0;
const typeorm_1 = require("typeorm");
const xray_entity_1 = require("../../xray/entities/xray.entity");
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "LOW";
    RiskLevel["MODERATE"] = "MODERATE";
    RiskLevel["HIGH"] = "HIGH";
    RiskLevel["CRITICAL"] = "CRITICAL";
    RiskLevel["UNKNOWN"] = "UNKNOWN";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
let AIReport = class AIReport {
    id;
    xray;
    xrayId;
    prediction;
    specialization;
    confidence;
    findings;
    riskLevel;
    selectedSpecialization;
    generatedAt;
};
exports.AIReport = AIReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AIReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => xray_entity_1.XRay, (xray) => xray.aiReport),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", xray_entity_1.XRay)
], AIReport.prototype, "xray", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AIReport.prototype, "xrayId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AIReport.prototype, "prediction", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AIReport.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], AIReport.prototype, "confidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AIReport.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RiskLevel,
        default: RiskLevel.LOW,
    }),
    __metadata("design:type", String)
], AIReport.prototype, "riskLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AIReport.prototype, "selectedSpecialization", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AIReport.prototype, "generatedAt", void 0);
exports.AIReport = AIReport = __decorate([
    (0, typeorm_1.Entity)()
], AIReport);
//# sourceMappingURL=ai-report.entity.js.map