import { User } from './user.entity';
export declare class DoctorProfile {
    id: string;
    user: User;
    userId: string;
    fullName: string;
    specialization: string;
    licenseNumber: string;
    experience: number;
    clinicName: string;
    hospital: string;
    isApproved: boolean;
}
