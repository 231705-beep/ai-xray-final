import { Appointment } from '../../appointment/entities/appointment.entity';
export declare enum PrescriptionStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}
export declare class Prescription {
    id: string;
    appointment: Appointment;
    appointmentId: string;
    issuedAt: Date;
}
