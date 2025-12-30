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
exports.Prescription = exports.PrescriptionStatus = void 0;
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("../../appointment/entities/appointment.entity");
var PrescriptionStatus;
(function (PrescriptionStatus) {
    PrescriptionStatus["ACTIVE"] = "ACTIVE";
    PrescriptionStatus["ARCHIVED"] = "ARCHIVED";
})(PrescriptionStatus || (exports.PrescriptionStatus = PrescriptionStatus = {}));
let Prescription = class Prescription {
    id;
    appointment;
    appointmentId;
    issuedAt;
};
exports.Prescription = Prescription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Prescription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => appointment_entity_1.Appointment),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", appointment_entity_1.Appointment)
], Prescription.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prescription.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Prescription.prototype, "issuedAt", void 0);
exports.Prescription = Prescription = __decorate([
    (0, typeorm_1.Entity)()
], Prescription);
//# sourceMappingURL=prescription.entity.js.map