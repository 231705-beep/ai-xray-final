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
exports.ExternalDoctorRequest = exports.ExternalDoctorRequestStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var ExternalDoctorRequestStatus;
(function (ExternalDoctorRequestStatus) {
    ExternalDoctorRequestStatus["PENDING_ADMIN_APPROVAL"] = "PENDING_ADMIN_APPROVAL";
    ExternalDoctorRequestStatus["APPROVED"] = "APPROVED";
    ExternalDoctorRequestStatus["REJECTED"] = "REJECTED";
})(ExternalDoctorRequestStatus || (exports.ExternalDoctorRequestStatus = ExternalDoctorRequestStatus = {}));
let ExternalDoctorRequest = class ExternalDoctorRequest {
    id;
    patient;
    patientId;
    doctorName;
    hospital;
    specialization;
    status;
    createdAt;
};
exports.ExternalDoctorRequest = ExternalDoctorRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExternalDoctorRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'patientId' }),
    __metadata("design:type", user_entity_1.User)
], ExternalDoctorRequest.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExternalDoctorRequest.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExternalDoctorRequest.prototype, "doctorName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExternalDoctorRequest.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExternalDoctorRequest.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExternalDoctorRequestStatus,
        default: ExternalDoctorRequestStatus.PENDING_ADMIN_APPROVAL,
    }),
    __metadata("design:type", String)
], ExternalDoctorRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ExternalDoctorRequest.prototype, "createdAt", void 0);
exports.ExternalDoctorRequest = ExternalDoctorRequest = __decorate([
    (0, typeorm_1.Entity)()
], ExternalDoctorRequest);
//# sourceMappingURL=external-doctor-request.entity.js.map