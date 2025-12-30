"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_profile_entity_1 = require("../users/entities/doctor-profile.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ai_report_entity_1 = require("../ai-analysis/entities/ai-report.entity");
const doctor_availability_entity_1 = require("./entities/doctor-availability.entity");
const external_doctor_request_entity_1 = require("./entities/external-doctor-request.entity");
const ai_finding_entity_1 = require("../ai-analysis/entities/ai-finding.entity");
const appointment_entity_1 = require("../appointment/entities/appointment.entity");
let DoctorService = class DoctorService {
    doctorProfileRepository;
    userRepository;
    aiReportRepository;
    appointmentRepository;
    availabilityRepository;
    externalRequestRepository;
    aiFindingRepository;
    async onModuleInit() {
        const count = await this.doctorProfileRepository.count();
        if (count === 0) {
            console.log('No doctors found. Seeding initial data...');
            await this.seedDoctors();
        }
    }
    constructor(doctorProfileRepository, userRepository, aiReportRepository, appointmentRepository, availabilityRepository, externalRequestRepository, aiFindingRepository) {
        this.doctorProfileRepository = doctorProfileRepository;
        this.userRepository = userRepository;
        this.aiReportRepository = aiReportRepository;
        this.appointmentRepository = appointmentRepository;
        this.availabilityRepository = availabilityRepository;
        this.externalRequestRepository = externalRequestRepository;
        this.aiFindingRepository = aiFindingRepository;
    }
    specializationMapping = {
        'pneumonia': 'Pulmonology (Thorax)',
        'infection': 'Pulmonology (Thorax)',
        'lung opacity': 'Pulmonology (Thorax)',
        'tuberculosis': 'Pulmonology (Thorax)',
        'cardiomegaly': 'Cardiology',
        'tumor': 'Oncology',
        'mass': 'Oncology',
        'fracture': 'Orthopedics',
        'dislocation': 'Orthopedics',
    };
    async extractKeywordsAndMap(reportId) {
        const report = await this.aiReportRepository.findOne({ where: { id: reportId } });
        if (!report)
            return null;
        const keywords = [];
        const text = (report.prediction + ' ' + (report.findings || '')).toLowerCase();
        for (const [key, spec] of Object.entries(this.specializationMapping)) {
            if (text.includes(key)) {
                keywords.push({ label: key, confidence: report.confidence });
            }
        }
        let specialization = 'General Physician';
        if (keywords.length > 0) {
            specialization = this.specializationMapping[keywords[0].label];
        }
        else if (text.includes('unclear') || text.includes('multiple')) {
            specialization = 'General Physician';
        }
        for (const kw of keywords) {
            await this.aiFindingRepository.save({
                aiReport: { id: reportId },
                label: kw.label,
                confidenceScore: kw.confidence
            });
        }
        report.selectedSpecialization = specialization;
        await this.aiReportRepository.save(report);
        return specialization;
    }
    async findRecommended(aiReportId) {
        let specialization = '';
        const report = await this.aiReportRepository.findOne({ where: { id: aiReportId } });
        if (report && report.selectedSpecialization) {
            specialization = report.selectedSpecialization;
        }
        else {
            specialization = await this.extractKeywordsAndMap(aiReportId) || 'General Physician';
        }
        return this.doctorProfileRepository.find({
            where: { specialization, isApproved: true },
            relations: ['user'],
            take: 5
        });
    }
    async submitExternalRequest(userId, data) {
        const request = this.externalRequestRepository.create({
            patientId: userId,
            doctorName: data.doctorName || data.doctor_name,
            hospital: data.hospital,
            specialization: data.specialization
        });
        return this.externalRequestRepository.save(request);
    }
    async search(query) {
        return this.doctorProfileRepository.createQueryBuilder('doctor')
            .leftJoinAndSelect('doctor.user', 'user')
            .where('doctor.isApproved = :approved', { approved: true })
            .andWhere('(doctor.fullName ILIKE :query OR user.email ILIKE :query OR doctor.id ILIKE :query)', { query: `%${query}%` })
            .getMany();
    }
    async seedDoctors() {
        const specializations = [
            'Cardiology', 'Dermatology', 'Gastroenterology', 'Neurology',
            'Pediatrics', 'Pulmonology (Thorax)', 'Nephrology', 'Family Medicine',
            'General Surgery', 'Neurosurgery', 'Orthopedics', 'Urology',
            'Anesthesiology', 'Ophthalmology', 'Obstetrics & Gynecology',
            'Psychiatry', 'Radiology', 'Pathology', 'ENT', 'Oncology'
        ];
        const hospitals = ['City Medical Center', 'Global Health Institute', 'Heritage Hospital', 'Mercy Care Clinic', 'St. Jude Medical'];
        const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        for (const spec of specializations) {
            for (let i = 1; i <= 3; i++) {
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const fullName = `Dr. ${firstName} ${lastName}`;
                const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@medmail.com`;
                const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];
                let user = await this.userRepository.findOne({ where: { email } });
                if (!user) {
                    const hashedPassword = await bcrypt.hash('password123', 10);
                    user = this.userRepository.create({
                        email,
                        password: hashedPassword,
                        role: user_entity_1.UserRole.DOCTOR
                    });
                    user = await this.userRepository.save(user);
                }
                let profile = await this.doctorProfileRepository.findOne({ where: { userId: user.id } });
                if (!profile) {
                    profile = this.doctorProfileRepository.create({
                        userId: user.id,
                        fullName,
                        specialization: spec,
                        hospital,
                        experience: 5 + Math.floor(Math.random() * 20),
                        isApproved: true,
                        licenseNumber: `LIC-${spec.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
                    });
                    await this.doctorProfileRepository.save(profile);
                }
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                const slots = [
                    { start: '09:00 AM', end: '12:00 PM' },
                    { start: '02:00 PM', end: '05:00 PM' },
                    { start: '06:00 PM', end: '09:00 PM' }
                ];
                for (let j = 0; j < 3; j++) {
                    const day = days[Math.floor(Math.random() * days.length)];
                    const slot = slots[j];
                    const existingSlot = await this.availabilityRepository.findOne({
                        where: { doctor: { id: user.id }, dayOfWeek: day, startTime: slot.start }
                    });
                    if (!existingSlot) {
                        await this.availabilityRepository.save({
                            doctor: user,
                            dayOfWeek: day,
                            startTime: slot.start,
                            endTime: slot.end,
                            isAvailable: true
                        });
                    }
                }
            }
        }
        return { message: 'Realistic seeding complete with availability slots' };
    }
    async getAvailability(doctorId) {
        return this.availabilityRepository.find({
            where: { doctor: { id: doctorId } }
        });
    }
    async findAll() {
        return this.doctorProfileRepository.find({
            where: { isApproved: true },
            relations: ['user']
        });
    }
    async getAll() {
        return this.doctorProfileRepository.find({ relations: ['user'] });
    }
    async findOne(id) {
        return this.doctorProfileRepository.findOne({ where: { id }, relations: ['user'] });
    }
    async getDashboardStats(doctorId) {
        const totalAppointments = await this.appointmentRepository.count({ where: { doctorId } });
        const pendingAppointments = await this.appointmentRepository.count({ where: { doctorId, status: appointment_entity_1.AppointmentStatus.PENDING } });
        const appointments = await this.appointmentRepository.find({ where: { doctorId } });
        const uniquePatients = new Set(appointments.map(a => a.patientId)).size;
        return {
            totalPatients: uniquePatients,
            pendingAppointments: pendingAppointments,
            totalAppointments: totalAppointments,
            newReports: pendingAppointments
        };
    }
    async getDoctorReports(doctorId) {
        const appointments = await this.appointmentRepository.find({
            where: { doctorId },
            relations: ['patient', 'patient.patientProfile', 'patient.xrays', 'patient.xrays.aiReport']
        });
        const reports = [];
        const seenXrays = new Set();
        appointments.forEach(app => {
            app.patient?.xrays?.forEach(xray => {
                if (xray.aiReport && !seenXrays.has(xray.id)) {
                    reports.push({
                        id: xray.aiReport.id,
                        xrayId: xray.id,
                        patientName: app.patient?.patientProfile?.fullName || app.patient?.email,
                        prediction: xray.aiReport.prediction,
                        confidence: xray.aiReport.confidence,
                        riskLevel: xray.aiReport.riskLevel,
                        findings: xray.aiReport.findings,
                        date: xray.uploadedAt
                    });
                    seenXrays.add(xray.id);
                }
            });
        });
        return reports;
    }
    async getPendingDoctors() {
        return this.doctorProfileRepository.find({
            where: { isApproved: false },
            relations: ['user']
        });
    }
    async approveDoctor(doctorId) {
        const profile = await this.doctorProfileRepository.findOne({ where: { id: doctorId } });
        if (!profile)
            throw new common_1.NotFoundException('Doctor profile not found');
        profile.isApproved = true;
        return this.doctorProfileRepository.save(profile);
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_profile_entity_1.DoctorProfile)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(ai_report_entity_1.AIReport)),
    __param(3, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(4, (0, typeorm_1.InjectRepository)(doctor_availability_entity_1.DoctorAvailability)),
    __param(5, (0, typeorm_1.InjectRepository)(external_doctor_request_entity_1.ExternalDoctorRequest)),
    __param(6, (0, typeorm_1.InjectRepository)(ai_finding_entity_1.AIFinding)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map