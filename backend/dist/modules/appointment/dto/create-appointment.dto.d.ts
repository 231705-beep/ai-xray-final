import { ConsultationMode, PaymentMode } from '../entities/appointment.entity';
export declare class CreateAppointmentDto {
    doctorId: string;
    date: Date;
    aiReportId?: string;
    consultationMode?: ConsultationMode;
    paymentMode?: PaymentMode;
    notes?: string;
}
