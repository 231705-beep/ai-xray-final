import { User } from '../../users/entities/user.entity';
export declare enum AppointmentStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum ConsultationMode {
    PHYSICAL = "PHYSICAL",
    VIRTUAL = "VIRTUAL"
}
export declare enum PaymentMode {
    ONSITE = "ONSITE",
    ONLINE = "ONLINE"
}
export declare enum PaymentStatus {
    PENDING_ONSITE = "PENDING_ONSITE",
    PAID = "PAID",
    FAILED = "FAILED"
}
export declare enum AppointmentSource {
    RECOMMENDED = "RECOMMENDED",
    OWN_DOCTOR = "OWN_DOCTOR"
}
export declare class Appointment {
    id: string;
    patient: User;
    patientId: string;
    doctor: User;
    doctorId: string;
    date: Date;
    aiReportId: string;
    consultationMode: ConsultationMode;
    paymentMode: PaymentMode;
    paymentStatus: PaymentStatus;
    status: AppointmentStatus;
    rejectionReason: string;
    source: AppointmentSource;
}
