import { User } from '../../users/entities/user.entity';
export declare class DoctorAvailability {
    id: string;
    doctor: User;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}
