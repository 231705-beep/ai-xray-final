import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from './entities/appointment.entity';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto, req: any): Promise<import("./entities/appointment.entity").Appointment>;
    findByPatient(patientId: string): Promise<import("./entities/appointment.entity").Appointment[]>;
    findByDoctor(doctorId: string): Promise<import("./entities/appointment.entity").Appointment[]>;
    accept(id: string): Promise<import("./entities/appointment.entity").Appointment>;
    reject(id: string, reason: string): Promise<import("./entities/appointment.entity").Appointment>;
    updateStatus(id: string, status: AppointmentStatus): Promise<import("./entities/appointment.entity").Appointment>;
}
