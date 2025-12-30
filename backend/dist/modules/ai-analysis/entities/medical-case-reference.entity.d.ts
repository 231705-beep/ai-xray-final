import { RiskLevel } from './ai-report.entity';
export declare class MedicalCaseReference {
    id: number;
    caseIdNum: number;
    xrayType: string;
    specialization: string;
    disease: string;
    description: string;
    imagePath: string;
    riskLevel: RiskLevel;
}
