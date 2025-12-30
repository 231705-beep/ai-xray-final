import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { EmailService } from '../email/email.service';
import { Appointment } from '../appointment/entities/appointment.entity';
export declare class PrescriptionService {
    private prescriptionRepository;
    private appointmentRepository;
    private emailService;
    constructor(prescriptionRepository: Repository<Prescription>, appointmentRepository: Repository<Appointment>, emailService: EmailService);
    create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription>;
    findByAppointment(appointmentId: string): Promise<Prescription | null>;
    findAllByPatient(patientId: string): Promise<Prescription[]>;
    findOne(id: string): Promise<Prescription>;
}
