import { User } from '../../users/entities/user.entity';
import { XRay } from '../../xray/entities/xray.entity';
export declare class DoctorReport {
    id: string;
    doctor: User;
    patient: User;
    xray: XRay;
    findings: string;
    recommendations: string;
}
