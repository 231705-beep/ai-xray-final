import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PatientProfile } from './entities/patient-profile.entity';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService implements OnModuleInit {
    private usersRepository;
    private patientProfileRepository;
    private doctorProfileRepository;
    constructor(usersRepository: Repository<User>, patientProfileRepository: Repository<PatientProfile>, doctorProfileRepository: Repository<DoctorProfile>);
    onModuleInit(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
