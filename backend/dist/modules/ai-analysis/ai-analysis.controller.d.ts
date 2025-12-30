import { AiAnalysisService } from './ai-analysis.service';
export declare class AiAnalysisController {
    private readonly aiService;
    constructor(aiService: AiAnalysisService);
    analyze(xrayId: string): Promise<import("./entities/ai-report.entity").AIReport>;
}
