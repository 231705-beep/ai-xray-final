import { Repository } from 'typeorm';
import { XRay } from './entities/xray.entity';
import { User } from '../users/entities/user.entity';
import { AiAnalysisService } from '../ai-analysis/ai-analysis.service';
export declare class XrayService {
    private xrayRepository;
    private userRepository;
    private aiAnalysisService;
    constructor(xrayRepository: Repository<XRay>, userRepository: Repository<User>, aiAnalysisService: AiAnalysisService);
    uploadXray(file: Express.Multer.File, userId: string): Promise<XRay>;
    findAllByPatient(patientId: string): Promise<XRay[]>;
    findOne(id: string): Promise<XRay>;
}
