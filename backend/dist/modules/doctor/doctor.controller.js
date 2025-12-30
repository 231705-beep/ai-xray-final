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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let DoctorController = class DoctorController {
    doctorService;
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    getDashboard(req) {
        return this.doctorService.getDashboardStats(req.user.userId);
    }
    getDoctorReports(req) {
        return this.doctorService.getDoctorReports(req.user.userId);
    }
    findRecommended(aiReportId) {
        return this.doctorService.findRecommended(aiReportId);
    }
    search(query) {
        return this.doctorService.search(query);
    }
    getAvailability(id) {
        return this.doctorService.getAvailability(id);
    }
    updateAvailability(id, data) {
        return { message: 'Availability updated' };
    }
    submitExternalRequest(req, data) {
        return this.doctorService.submitExternalRequest(req.user.userId, data);
    }
    findAll() {
        return this.doctorService.findAll();
    }
    seedDoctors() {
        return this.doctorService.seedDoctors();
    }
    getPending() {
        return this.doctorService.getPendingDoctors();
    }
    approve(id) {
        return this.doctorService.approveDoctor(id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('reports'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getDoctorReports", null);
__decorate([
    (0, common_1.Get)('recommended/:aiReportId'),
    __param(0, (0, common_1.Param)('aiReportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findRecommended", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id/availability'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Post)(':id/availability'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DOCTOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "updateAvailability", null);
__decorate([
    (0, common_1.Post)('external-request'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PATIENT),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "submitExternalRequest", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('seed-doctors'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "seedDoctors", null);
__decorate([
    (0, common_1.Get)('admin/pending'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "getPending", null);
__decorate([
    (0, common_1.Patch)('admin/:id/approve'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "approve", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctor'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map