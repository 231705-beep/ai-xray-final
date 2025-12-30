import { Injectable, OnModuleInit } from '@nestjs/common';
import { EmailService } from './modules/email/email.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly emailService: EmailService) { }

  async onModuleInit() {
    await this.emailService.verify();

    await this.emailService.sendMail(
      'YOUR_EMAIL@gmail.com',
      'SMTP WORKING',
      'If you receive this, email is fixed.'
    );
  }
}
