import { User } from '../../users/entities/user.entity';
export declare class EmailVerification {
    id: string;
    user: User;
    token: string;
    verifiedAt: Date;
}
