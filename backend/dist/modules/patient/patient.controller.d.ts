import { PatientService } from './patient.service';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    getDashboard(req: any): Promise<{
        uploadedXrays: number;
        upcomingAppointments: number;
        reportsAvailable: number;
    }>;
}
