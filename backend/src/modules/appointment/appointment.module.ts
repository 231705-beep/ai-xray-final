import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';

import { DoctorAvailability } from '../doctor/entities/doctor-availability.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment, DoctorAvailability])],
    controllers: [AppointmentController],
    providers: [AppointmentService],
    exports: [AppointmentService],
})
export class AppointmentModule { }
