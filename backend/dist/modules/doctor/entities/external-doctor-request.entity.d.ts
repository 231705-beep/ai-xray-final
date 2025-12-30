import { User } from '../../users/entities/user.entity';
export declare enum ExternalDoctorRequestStatus {
    PENDING_ADMIN_APPROVAL = "PENDING_ADMIN_APPROVAL",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class ExternalDoctorRequest {
    id: string;
    patient: User;
    patientId: string;
    doctorName: string;
    hospital: string;
    specialization: string;
    status: ExternalDoctorRequestStatus;
    createdAt: Date;
}
