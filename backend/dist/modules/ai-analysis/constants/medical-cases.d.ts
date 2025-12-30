import { RiskLevel } from '../entities/ai-report.entity';
export interface MedicalCase {
    case_id: number;
    xray_type: string;
    specialization: string;
    disease: string;
    description: string;
    image_path: string;
    riskLevel: RiskLevel;
}
export declare const MEDICAL_CASE_DATASET: MedicalCase[];
