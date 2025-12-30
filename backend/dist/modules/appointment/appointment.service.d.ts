import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus, AppointmentSource } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { EmailService } from '../email/email.service';
import { DoctorAvailability } from '../doctor/entities/doctor-availability.entity';
export declare class AppointmentService {
    private appointmentRepository;
    private emailService;
    private availabilityRepository;
    constructor(appointmentRepository: Repository<Appointment>, emailService: EmailService, availabilityRepository: Repository<DoctorAvailability>);
    create(createAppointmentDto: CreateAppointmentDto & {
        source?: AppointmentSource;
    }, patientId: string): Promise<Appointment>;
    accept(id: string): Promise<Appointment>;
    reject(id: string, reason: string): Promise<Appointment>;
    findAllByPatient(patientId: string): Promise<Appointment[]>;
    findAllByDoctor(doctorId: string): Promise<Appointment[]>;
    updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
}
