"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const doctor_service_1 = require("./doctor.service");
const doctor_controller_1 = require("./doctor.controller");
const doctor_profile_entity_1 = require("../users/entities/doctor-profile.entity");
const user_entity_1 = require("../users/entities/user.entity");
const doctor_availability_entity_1 = require("./entities/doctor-availability.entity");
const doctor_report_entity_1 = require("./entities/doctor-report.entity");
const ai_report_entity_1 = require("../ai-analysis/entities/ai-report.entity");
const appointment_entity_1 = require("../appointment/entities/appointment.entity");
const external_doctor_request_entity_1 = require("./entities/external-doctor-request.entity");
const ai_finding_entity_1 = require("../ai-analysis/entities/ai-finding.entity");
let DoctorModule = class DoctorModule {
};
exports.DoctorModule = DoctorModule;
exports.DoctorModule = DoctorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                doctor_profile_entity_1.DoctorProfile, user_entity_1.User, doctor_availability_entity_1.DoctorAvailability, doctor_report_entity_1.DoctorReport,
                ai_report_entity_1.AIReport, appointment_entity_1.Appointment, external_doctor_request_entity_1.ExternalDoctorRequest, ai_finding_entity_1.AIFinding
            ])],
        controllers: [doctor_controller_1.DoctorController],
        providers: [doctor_service_1.DoctorService],
        exports: [doctor_service_1.DoctorService],
    })
], DoctorModule);
//# sourceMappingURL=doctor.module.js.map