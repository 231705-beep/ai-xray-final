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
exports.Appointment = exports.AppointmentSource = exports.PaymentStatus = exports.PaymentMode = exports.ConsultationMode = exports.AppointmentStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["PENDING"] = "PENDING";
    AppointmentStatus["ACCEPTED"] = "ACCEPTED";
    AppointmentStatus["REJECTED"] = "REJECTED";
    AppointmentStatus["COMPLETED"] = "COMPLETED";
    AppointmentStatus["CANCELLED"] = "CANCELLED";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var ConsultationMode;
(function (ConsultationMode) {
    ConsultationMode["PHYSICAL"] = "PHYSICAL";
    ConsultationMode["VIRTUAL"] = "VIRTUAL";
})(ConsultationMode || (exports.ConsultationMode = ConsultationMode = {}));
var PaymentMode;
(function (PaymentMode) {
    PaymentMode["ONSITE"] = "ONSITE";
    PaymentMode["ONLINE"] = "ONLINE";
})(PaymentMode || (exports.PaymentMode = PaymentMode = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING_ONSITE"] = "PENDING_ONSITE";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var AppointmentSource;
(function (AppointmentSource) {
    AppointmentSource["RECOMMENDED"] = "RECOMMENDED";
    AppointmentSource["OWN_DOCTOR"] = "OWN_DOCTOR";
})(AppointmentSource || (exports.AppointmentSource = AppointmentSource = {}));
let Appointment = class Appointment {
    id;
    patient;
    patientId;
    doctor;
    doctorId;
    date;
    aiReportId;
    consultationMode;
    paymentMode;
    paymentStatus;
    status;
    rejectionReason;
    source;
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'patientId' }),
    __metadata("design:type", user_entity_1.User)
], Appointment.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'doctorId' }),
    __metadata("design:type", user_entity_1.User)
], Appointment.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "aiReportId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ConsultationMode,
        default: ConsultationMode.PHYSICAL,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "consultationMode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentMode,
        default: PaymentMode.ONSITE,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "paymentMode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING_ONSITE,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.PENDING,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AppointmentSource,
        default: AppointmentSource.RECOMMENDED,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "source", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)()
], Appointment);
//# sourceMappingURL=appointment.entity.js.map