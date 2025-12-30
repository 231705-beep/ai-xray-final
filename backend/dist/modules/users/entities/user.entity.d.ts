import { PatientProfile } from './patient-profile.entity';
import { DoctorProfile } from './doctor-profile.entity';
import { XRay } from '../../xray/entities/xray.entity';
export declare enum UserRole {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR",
    ADMIN = "ADMIN"
}
export declare class User {
    id: string;
    email: string;
    fullName: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    patientProfile: PatientProfile;
    doctorProfile: DoctorProfile;
    xrays: XRay[];
}
