import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(): Promise<{
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
    getActivity(): Promise<import("../xray/entities/xray.entity").XRay[]>;
    approveDoctor(id: string): Promise<import("../users/entities/doctor-profile.entity").DoctorProfile | undefined>;
    getAllUsers(): Promise<import("../users/entities/user.entity").User[]>;
}
