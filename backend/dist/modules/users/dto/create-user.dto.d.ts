import { UserRole } from '../entities/user.entity';
export declare class CreateUserDto {
    email: string;
    password: string;
    role: UserRole;
    fullName: string;
    age?: number;
    gender?: string;
    contact?: string;
    phoneNumber?: string;
    medicalHistory?: string;
    specialization?: string;
    licenseNumber?: string;
    experience?: string;
}
