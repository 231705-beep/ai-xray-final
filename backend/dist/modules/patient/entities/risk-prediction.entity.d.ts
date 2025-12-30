import { User } from '../../users/entities/user.entity';
export declare class RiskPrediction {
    id: string;
    patient: User;
    condition: string;
    riskLevel: string;
    probability: number;
}
