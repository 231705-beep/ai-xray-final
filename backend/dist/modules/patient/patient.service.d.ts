import { Repository } from 'typeorm';
import { PatientProfile } from '../users/entities/patient-profile.entity';
export declare class PatientService {
    private patientProfileRepository;
    constructor(patientProfileRepository: Repository<PatientProfile>);
    findAll(): Promise<PatientProfile[]>;
    findOne(id: string): Promise<PatientProfile | null>;
    getDashboardStats(patientId: string): Promise<{
        uploadedXrays: number;
        upcomingAppointments: number;
        reportsAvailable: number;
    }>;
}
