import { DoctorService } from './doctor.service';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    getDashboard(req: any): Promise<{
        totalPatients: number;
        pendingAppointments: number;
        totalAppointments: number;
        newReports: number;
    }>;
    getDoctorReports(req: any): Promise<any[]>;
    findRecommended(aiReportId: string): Promise<import("../users/entities/doctor-profile.entity").DoctorProfile[]>;
    search(query: string): Promise<import("../users/entities/doctor-profile.entity").DoctorProfile[]>;
    getAvailability(id: string): Promise<import("./entities/doctor-availability.entity").DoctorAvailability[]>;
    updateAvailability(id: string, data: any): {
        message: string;
    };
    submitExternalRequest(req: any, data: any): Promise<import("./entities/external-doctor-request.entity").ExternalDoctorRequest>;
    findAll(): Promise<import("../users/entities/doctor-profile.entity").DoctorProfile[]>;
    seedDoctors(): Promise<{
        message: string;
    }>;
    getPending(): Promise<import("../users/entities/doctor-profile.entity").DoctorProfile[]>;
    approve(id: string): Promise<import("../users/entities/doctor-profile.entity").DoctorProfile>;
}
