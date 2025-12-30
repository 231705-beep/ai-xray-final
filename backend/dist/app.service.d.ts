import { OnModuleInit } from '@nestjs/common';
import { EmailService } from './modules/email/email.service';
export declare class AppService implements OnModuleInit {
    private readonly emailService;
    constructor(emailService: EmailService);
    onModuleInit(): Promise<void>;
}
