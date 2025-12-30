import { User } from '../../users/entities/user.entity';
export declare class Notification {
    id: string;
    user: User;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}
