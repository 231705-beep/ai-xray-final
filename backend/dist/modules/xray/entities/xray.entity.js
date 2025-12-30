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
exports.XRay = exports.XRayStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const ai_report_entity_1 = require("../../ai-analysis/entities/ai-report.entity");
var XRayStatus;
(function (XRayStatus) {
    XRayStatus["PENDING"] = "PENDING";
    XRayStatus["ANALYZED"] = "ANALYZED";
    XRayStatus["REVIEWED"] = "REVIEWED";
    XRayStatus["FAILED"] = "FAILED";
})(XRayStatus || (exports.XRayStatus = XRayStatus = {}));
let XRay = class XRay {
    id;
    patient;
    patientId;
    imageUrl;
    originalName;
    status;
    uploadedAt;
    aiReport;
};
exports.XRay = XRay;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], XRay.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.xrays),
    (0, typeorm_1.JoinColumn)({ name: 'patientId' }),
    __metadata("design:type", user_entity_1.User)
], XRay.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], XRay.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], XRay.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], XRay.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: XRayStatus,
        default: XRayStatus.PENDING,
    }),
    __metadata("design:type", String)
], XRay.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], XRay.prototype, "uploadedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ai_report_entity_1.AIReport, (report) => report.xray, { cascade: true }),
    __metadata("design:type", ai_report_entity_1.AIReport)
], XRay.prototype, "aiReport", void 0);
exports.XRay = XRay = __decorate([
    (0, typeorm_1.Entity)()
], XRay);
//# sourceMappingURL=xray.entity.js.map