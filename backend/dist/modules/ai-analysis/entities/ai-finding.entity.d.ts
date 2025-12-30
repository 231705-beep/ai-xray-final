import { AIReport } from './ai-report.entity';
export declare class AIFinding {
    id: string;
    aiReport: AIReport;
    label: string;
    confidenceScore: number;
}
