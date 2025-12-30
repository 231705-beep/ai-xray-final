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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const email_service_1 = require("../email/email.service");
const doctor_availability_entity_1 = require("../doctor/entities/doctor-availability.entity");
let AppointmentService = class AppointmentService {
    appointmentRepository;
    emailService;
    availabilityRepository;
    constructor(appointmentRepository, emailService, availabilityRepository) {
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
        this.availabilityRepository = availabilityRepository;
    }
    async create(createAppointmentDto, patientId) {
        const appointmentDate = new Date(createAppointmentDto.date);
        const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });
        const slot = await this.availabilityRepository.findOne({
            where: {
                doctor: { id: createAppointmentDto.doctorId },
                dayOfWeek: dayOfWeek,
                isAvailable: true
            }
        });
        const existing = await this.appointmentRepository.findOne({
            where: {
                doctorId: createAppointmentDto.doctorId,
                date: createAppointmentDto.date,
                status: appointment_entity_1.AppointmentStatus.ACCEPTED
            }
        });
        if (existing) {
            throw new common_1.BadRequestException('This time slot is already booked.');
        }
        const appointment = this.appointmentRepository.create({
            ...createAppointmentDto,
            patientId,
            status: appointment_entity_1.AppointmentStatus.PENDING,
            source: createAppointmentDto.source || appointment_entity_1.AppointmentSource.RECOMMENDED
        });
        const savedAppointment = await this.appointmentRepository.save(appointment);
        const fullAppointment = await this.appointmentRepository.findOne({
            where: { id: savedAppointment.id },
            relations: ['patient', 'patient.patientProfile', 'doctor', 'doctor.doctorProfile']
        });
        if (fullAppointment) {
            const doctorName = fullAppointment.doctor?.doctorProfile?.fullName || 'the specialist';
            try {
                await this.emailService.sendMail(fullAppointment.patient.email, 'Appointment Requested', `Your physical appointment with Dr. ${doctorName} is pending. Please pay onsite.`);
            }
            catch (emailErr) {
            }
        }
        return savedAppointment;
    }
    async accept(id) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
            relations: ['patient', 'doctor']
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        appointment.status = appointment_entity_1.AppointmentStatus.ACCEPTED;
        const saved = await this.appointmentRepository.save(appointment);
        await this.emailService.sendMail(appointment.patient.email, 'Appointment Accepted', `Your appointment with Dr. ${appointment.doctor.email} has been accepted.`);
        return saved;
    }
    async reject(id, reason) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
            relations: ['patient', 'doctor']
        });
        if (!appointment)
            throw new common_1.NotFoundException('Appointment not found');
        appointment.status = appointment_entity_1.AppointmentStatus.REJECTED;
        appointment.rejectionReason = reason;
        const saved = await this.appointmentRepository.save(appointment);
        await this.emailService.sendMail(appointment.patient.email, 'Appointment Rejected', `Your appointment with Dr. ${appointment.doctor.email} was rejected. Reason: ${reason}`);
        return saved;
    }
    async findAllByPatient(patientId) {
        return this.appointmentRepository.find({
            where: { patientId },
            relations: ['doctor', 'doctor.doctorProfile'],
            order: { date: 'DESC' },
        });
    }
    async findAllByDoctor(doctorId) {
        return this.appointmentRepository.find({
            where: { doctorId },
            relations: ['patient', 'patient.patientProfile'],
            order: { date: 'ASC' },
        });
    }
    async updateStatus(id, status) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        appointment.status = status;
        return this.appointmentRepository.save(appointment);
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(2, (0, typeorm_1.InjectRepository)(doctor_availability_entity_1.DoctorAvailability)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService,
        typeorm_2.Repository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map