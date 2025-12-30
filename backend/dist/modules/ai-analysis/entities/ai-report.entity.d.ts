import { XRay } from '../../xray/entities/xray.entity';
export declare enum RiskLevel {
    LOW = "LOW",
    MODERATE = "MODERATE",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL",
    UNKNOWN = "UNKNOWN"
}
export declare class AIReport {
    id: string;
    xray: XRay;
    xrayId: string;
    prediction: string;
    specialization: string;
    confidence: number;
    findings: string;
    riskLevel: RiskLevel;
    selectedSpecialization: string;
    generatedAt: Date;
}
