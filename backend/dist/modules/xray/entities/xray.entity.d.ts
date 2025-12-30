import { User } from '../../users/entities/user.entity';
import { AIReport } from '../../ai-analysis/entities/ai-report.entity';
export declare enum XRayStatus {
    PENDING = "PENDING",
    ANALYZED = "ANALYZED",
    REVIEWED = "REVIEWED",
    FAILED = "FAILED"
}
export declare class XRay {
    id: string;
    patient: User;
    patientId: string;
    imageUrl: string;
    originalName: string;
    status: XRayStatus;
    uploadedAt: Date;
    aiReport: AIReport;
}
