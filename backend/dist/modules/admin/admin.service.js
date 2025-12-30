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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_profile_entity_1 = require("../users/entities/doctor-profile.entity");
const user_entity_1 = require("../users/entities/user.entity");
const patient_profile_entity_1 = require("../users/entities/patient-profile.entity");
const xray_entity_1 = require("../xray/entities/xray.entity");
let AdminService = class AdminService {
    doctorRepo;
    userRepo;
    patientRepo;
    xrayRepo;
    constructor(doctorRepo, userRepo, patientRepo, xrayRepo) {
        this.doctorRepo = doctorRepo;
        this.userRepo = userRepo;
        this.patientRepo = patientRepo;
        this.xrayRepo = xrayRepo;
    }
    async getSystemStats() {
        const totalPatients = await this.patientRepo.count();
        const verifiedDoctors = await this.doctorRepo.count({ where: { isApproved: true } });
        const totalXrays = await this.xrayRepo.count();
        const totalAppointments = await this.userRepo.manager.count('appointment');
        const reports = await this.userRepo.manager.find('ai_report');
        const distribution = reports.reduce((acc, report) => {
            const pred = report.prediction || 'Unknown';
            acc[pred] = (acc[pred] || 0) + 1;
            return acc;
        }, {});
        const barData = Object.entries(distribution).map(([name, value], index) => {
            const colors = ['#10b981', '#f59e0b', '#ef4444', '#38bdf8', '#8b5cf6'];
            return { name, value, color: colors[index % colors.length] };
        });
        const analysisTrends = [
            { name: 'Mon', count: Math.floor(totalXrays * 0.1) },
            { name: 'Tue', count: Math.floor(totalXrays * 0.15) },
            { name: 'Wed', count: Math.floor(totalXrays * 0.2) },
            { name: 'Thu', count: Math.floor(totalXrays * 0.12) },
            { name: 'Fri', count: Math.floor(totalXrays * 0.18) },
            { name: 'Sat', count: Math.floor(totalXrays * 0.25) },
            { name: 'Sun', count: Math.floor(totalXrays * 0.22) },
        ];
        return {
            totalPatients,
            verifiedDoctors,
            totalXrays,
            totalAppointments,
            aiAccuracy: "98.4%",
            analysisTrends,
            diagnosisDistribution: barData
        };
    }
    async getRecentActivity() {
        return this.xrayRepo.find({
            relations: ['patient', 'aiReport'],
            order: { uploadedAt: 'DESC' },
            take: 10
        });
    }
    async approveDoctor(doctorId) {
        const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
        if (doctor) {
            doctor.isApproved = true;
            return this.doctorRepo.save(doctor);
        }
    }
    async getAllUsers() {
        return this.userRepo.find({ relations: ['patientProfile', 'doctorProfile'] });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_profile_entity_1.DoctorProfile)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(patient_profile_entity_1.PatientProfile)),
    __param(3, (0, typeorm_1.InjectRepository)(xray_entity_1.XRay)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map