import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DoctorProfile } from '../users/entities/doctor-profile.entity';
import { User } from '../users/entities/user.entity';
import { AIReport } from '../ai-analysis/entities/ai-report.entity';
import { DoctorAvailability } from './entities/doctor-availability.entity';
import { ExternalDoctorRequest } from './entities/external-doctor-request.entity';
import { AIFinding } from '../ai-analysis/entities/ai-finding.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
export declare class DoctorService implements OnModuleInit {
    private doctorProfileRepository;
    private userRepository;
    private aiReportRepository;
    private appointmentRepository;
    private availabilityRepository;
    private externalRequestRepository;
    private aiFindingRepository;
    onModuleInit(): Promise<void>;
    constructor(doctorProfileRepository: Repository<DoctorProfile>, userRepository: Repository<User>, aiReportRepository: Repository<AIReport>, appointmentRepository: Repository<Appointment>, availabilityRepository: Repository<DoctorAvailability>, externalRequestRepository: Repository<ExternalDoctorRequest>, aiFindingRepository: Repository<AIFinding>);
    private readonly specializationMapping;
    extractKeywordsAndMap(reportId: string): Promise<string | null>;
    findRecommended(aiReportId: string): Promise<DoctorProfile[]>;
    submitExternalRequest(userId: string, data: any): Promise<ExternalDoctorRequest>;
    search(query: string): Promise<DoctorProfile[]>;
    seedDoctors(): Promise<{
        message: string;
    }>;
    getAvailability(doctorId: string): Promise<DoctorAvailability[]>;
    findAll(): Promise<DoctorProfile[]>;
    getAll(): Promise<DoctorProfile[]>;
    findOne(id: string): Promise<DoctorProfile | null>;
    getDashboardStats(doctorId: string): Promise<{
        totalPatients: number;
        pendingAppointments: number;
        totalAppointments: number;
        newReports: number;
    }>;
    getDoctorReports(doctorId: string): Promise<any[]>;
    getPendingDoctors(): Promise<DoctorProfile[]>;
    approveDoctor(doctorId: string): Promise<DoctorProfile>;
}
