import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XRay } from './entities/xray.entity';
import { User } from '../users/entities/user.entity';
import { AiAnalysisService } from '../ai-analysis/ai-analysis.service';

@Injectable()
export class XrayService {
    constructor(
        @InjectRepository(XRay)
        private xrayRepository: Repository<XRay>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private aiAnalysisService: AiAnalysisService,
    ) { }

    async uploadXray(file: Express.Multer.File, userId: string): Promise<XRay> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const xray = this.xrayRepository.create({
            imageUrl: file.filename,
            originalName: file.originalname,
            patient: user,
            patientId: userId,
        });

        const savedXray = await this.xrayRepository.save(xray);

        // Trigger AI Analysis asynchronously
        this.aiAnalysisService.analyzeXray(savedXray.id).catch(err => {
            console.error(`Auto-analysis failed for Xray ${savedXray.id}:`, err);
        });

        return savedXray;
    }

    async findAllByPatient(patientId: string): Promise<XRay[]> {
        return this.xrayRepository.find({
            where: { patientId },
            relations: ['aiReport'],
            order: { uploadedAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<XRay> {
        const xray = await this.xrayRepository.findOne({
            where: { id },
            relations: ['aiReport', 'patient', 'patient.patientProfile'],
        });
        if (!xray) {
            throw new NotFoundException('X-Ray not found');
        }
        return xray;
    }
}
