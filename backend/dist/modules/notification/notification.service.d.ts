import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
export declare class NotificationService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
}
