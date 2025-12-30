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
exports.PrescriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prescription_entity_1 = require("./entities/prescription.entity");
const email_service_1 = require("../email/email.service");
const appointment_entity_1 = require("../appointment/entities/appointment.entity");
let PrescriptionService = class PrescriptionService {
    prescriptionRepository;
    appointmentRepository;
    emailService;
    constructor(prescriptionRepository, appointmentRepository, emailService) {
        this.prescriptionRepository = prescriptionRepository;
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
    }
    async create(createPrescriptionDto) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id: createPrescriptionDto.appointmentId },
            relations: ['patient', 'doctor', 'doctor.doctorProfile']
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        if (appointment.status !== appointment_entity_1.AppointmentStatus.COMPLETED) {
            throw new common_1.BadRequestException('Prescription can only be created for completed appointments');
        }
        const existing = await this.prescriptionRepository.findOne({
            where: { appointmentId: createPrescriptionDto.appointmentId }
        });
        if (existing) {
            throw new common_1.BadRequestException('Prescription already exists for this appointment');
        }
        const prescription = this.prescriptionRepository.create(createPrescriptionDto);
        const savedPrescription = await this.prescriptionRepository.save(prescription);
        const doctorName = appointment.doctor?.doctorProfile?.fullName || appointment.doctor?.email || 'Your Doctor';
        const patientEmail = appointment.patient?.email || 'patient@example.com';
        await this.emailService.sendMail(patientEmail, 'Prescription Issued', `Dear ${appointment.patient?.patientProfile?.fullName || 'Patient'},\n\nDr. ${doctorName} has issued your prescription. You can now view and download it from your patient portal.\n\nPlease log in to view the complete prescription details.`);
        return savedPrescription;
    }
    async findByAppointment(appointmentId) {
        return this.prescriptionRepository.findOne({
            where: { appointmentId },
            relations: ['appointment', 'appointment.patient', 'appointment.doctor', 'appointment.doctor.doctorProfile']
        });
    }
    async findAllByPatient(patientId) {
        return this.prescriptionRepository
            .createQueryBuilder('prescription')
            .leftJoinAndSelect('prescription.appointment', 'appointment')
            .leftJoinAndSelect('appointment.doctor', 'doctor')
            .leftJoinAndSelect('doctor.doctorProfile', 'doctorProfile')
            .where('appointment.patientId = :patientId', { patientId })
            .orderBy('prescription.issuedAt', 'DESC')
            .getMany();
    }
    async findOne(id) {
        const prescription = await this.prescriptionRepository.findOne({
            where: { id },
            relations: ['appointment', 'appointment.patient', 'appointment.patient.patientProfile', 'appointment.doctor', 'appointment.doctor.doctorProfile']
        });
        if (!prescription) {
            throw new common_1.NotFoundException('Prescription not found');
        }
        return prescription;
    }
};
exports.PrescriptionService = PrescriptionService;
exports.PrescriptionService = PrescriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prescription_entity_1.Prescription)),
    __param(1, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], PrescriptionService);
//# sourceMappingURL=prescription.service.js.map