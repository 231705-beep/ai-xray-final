import { Repository } from 'typeorm';
import { DoctorProfile } from '../users/entities/doctor-profile.entity';
import { User } from '../users/entities/user.entity';
import { PatientProfile } from '../users/entities/patient-profile.entity';
import { XRay } from '../xray/entities/xray.entity';
export declare class AdminService {
    private doctorRepo;
    private userRepo;
    private patientRepo;
    private xrayRepo;
    constructor(doctorRepo: Repository<DoctorProfile>, userRepo: Repository<User>, patientRepo: Repository<PatientProfile>, xrayRepo: Repository<XRay>);
    getSystemStats(): Promise<{
        totalPatients: number;
        verifiedDoctors: number;
        totalXrays: number;
        totalAppointments: number;
        aiAccuracy: string;
        analysisTrends: {
            name: string;
            count: number;
        }[];
        diagnosisDistribution: {
            name: string;
            value: any;
            color: string;
        }[];
    }>;
    getRecentActivity(): Promise<XRay[]>;
    approveDoctor(doctorId: string): Promise<DoctorProfile | undefined>;
    getAllUsers(): Promise<User[]>;
}
