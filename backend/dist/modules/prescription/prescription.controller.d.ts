import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
export declare class PrescriptionController {
    private readonly prescriptionService;
    constructor(prescriptionService: PrescriptionService);
    create(createPrescriptionDto: CreatePrescriptionDto): Promise<import("./entities/prescription.entity").Prescription>;
    findByAppointment(id: string): Promise<import("./entities/prescription.entity").Prescription | null>;
}
