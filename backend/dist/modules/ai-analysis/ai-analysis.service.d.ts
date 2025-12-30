import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AIReport } from './entities/ai-report.entity';
import { XRay } from '../xray/entities/xray.entity';
import { EmailService } from '../email/email.service';
import { MedicalCaseReference } from './entities/medical-case-reference.entity';
export declare class AiAnalysisService implements OnModuleInit {
    private aiReportRepository;
    private xrayRepository;
    private medicalCaseRepository;
    private emailService;
    private readonly logger;
    constructor(aiReportRepository: Repository<AIReport>, xrayRepository: Repository<XRay>, medicalCaseRepository: Repository<MedicalCaseReference>, emailService: EmailService);
    onModuleInit(): Promise<void>;
    analyzeXray(xrayId: string): Promise<AIReport>;
}
