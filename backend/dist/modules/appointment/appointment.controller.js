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
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("./appointment.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const appointment_entity_1 = require("./entities/appointment.entity");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let AppointmentController = class AppointmentController {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    create(createAppointmentDto, req) {
        return this.appointmentService.create(createAppointmentDto, req.user.userId);
    }
    findByPatient(patientId) {
        return this.appointmentService.findAllByPatient(patientId);
    }
    findByDoctor(doctorId) {
        return this.appointmentService.findAllByDoctor(doctorId);
    }
    accept(id) {
        return this.appointmentService.accept(id);
    }
    reject(id, reason) {
        return this.appointmentService.reject(id, reason);
    }
    updateStatus(id, status) {
        return this.appointmentService.updateStatus(id, status);
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PATIENT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PATIENT, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('doctor/:doctorId'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DOCTOR, user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findByDoctor", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "accept", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "reject", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "updateStatus", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map