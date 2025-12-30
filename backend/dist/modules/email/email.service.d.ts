import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    private readonly logger;
    constructor(configService: ConfigService);
    sendMail(to: string, subject: string, text: string): Promise<void>;
    verify(): Promise<void>;
}
