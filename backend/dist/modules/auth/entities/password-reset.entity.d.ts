import { User } from '../../users/entities/user.entity';
export declare class PasswordReset {
    id: string;
    user: User;
    token: string;
    expiresAt: Date;
}
