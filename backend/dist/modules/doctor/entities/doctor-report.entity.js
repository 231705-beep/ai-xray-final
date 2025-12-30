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
exports.DoctorReport = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const xray_entity_1 = require("../../xray/entities/xray.entity");
let DoctorReport = class DoctorReport {
    id;
    doctor;
    patient;
    xray;
    findings;
    recommendations;
};
exports.DoctorReport = DoctorReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DoctorReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], DoctorReport.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], DoctorReport.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => xray_entity_1.XRay),
    __metadata("design:type", xray_entity_1.XRay)
], DoctorReport.prototype, "xray", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DoctorReport.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], DoctorReport.prototype, "recommendations", void 0);
exports.DoctorReport = DoctorReport = __decorate([
    (0, typeorm_1.Entity)()
], DoctorReport);
//# sourceMappingURL=doctor-report.entity.js.map