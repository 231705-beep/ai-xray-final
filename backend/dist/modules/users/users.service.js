"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const patient_profile_entity_1 = require("./entities/patient-profile.entity");
const doctor_profile_entity_1 = require("./entities/doctor-profile.entity");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    usersRepository;
    patientProfileRepository;
    doctorProfileRepository;
    constructor(usersRepository, patientProfileRepository, doctorProfileRepository) {
        this.usersRepository = usersRepository;
        this.patientProfileRepository = patientProfileRepository;
        this.doctorProfileRepository = doctorProfileRepository;
    }
    async onModuleInit() {
        const admin = await this.usersRepository.findOne({ where: { role: user_entity_1.UserRole.ADMIN } });
        if (!admin) {
            console.log('Seeding default Admin...');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await this.usersRepository.save({
                email: 'admin@medmail.com',
                password: hashedPassword,
                role: user_entity_1.UserRole.ADMIN
            });
        }
    }
    async create(createUserDto) {
        const { email, password, role, ...profileData } = createUserDto;
        const normalizedEmail = email.toLowerCase();
        let user = await this.usersRepository.findOne({ where: { email: normalizedEmail } });
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Registering/Updating user with fullName:', profileData.fullName);
        if (user) {
            user.fullName = profileData.fullName;
            user.password = hashedPassword;
            user.role = role;
            user = await this.usersRepository.save(user);
        }
        else {
            user = this.usersRepository.create({
                email: normalizedEmail,
                fullName: profileData.fullName,
                password: hashedPassword,
                role,
            });
            user = await this.usersRepository.save(user);
        }
        const savedUser = user;
        console.log('Processed User ID:', savedUser.id, 'Name:', savedUser.fullName);
        if (role === 'PATIENT') {
            let patientProfile = await this.patientProfileRepository.findOne({ where: { userId: savedUser.id } });
            if (patientProfile) {
                patientProfile.fullName = profileData.fullName || savedUser.fullName || '';
                patientProfile.age = profileData.age || patientProfile.age || 0;
                patientProfile.gender = profileData.gender || patientProfile.gender || 'Other';
                patientProfile.contact = profileData.phoneNumber || profileData.contact || patientProfile.contact || '';
                patientProfile.medicalHistory = profileData.medicalHistory || patientProfile.medicalHistory || '';
            }
            else {
                patientProfile = this.patientProfileRepository.create({
                    user: savedUser,
                    userId: savedUser.id,
                    fullName: profileData.fullName || savedUser.fullName || '',
                    age: profileData.age || 0,
                    gender: profileData.gender || 'Other',
                    contact: profileData.phoneNumber || profileData.contact || '',
                    medicalHistory: profileData.medicalHistory || '',
                });
            }
            await this.patientProfileRepository.save(patientProfile);
        }
        else if (role === 'DOCTOR') {
            let doctorProfile = await this.doctorProfileRepository.findOne({ where: { userId: savedUser.id } });
            if (doctorProfile) {
                doctorProfile.fullName = profileData.fullName || savedUser.fullName || '';
                doctorProfile.specialization = profileData.specialization || doctorProfile.specialization || 'General Practice';
                doctorProfile.licenseNumber = profileData.licenseNumber || doctorProfile.licenseNumber || 'PENDING';
                doctorProfile.experience = Number(profileData.experience?.split('-')[0]) || doctorProfile.experience || 0;
            }
            else {
                doctorProfile = this.doctorProfileRepository.create({
                    user: savedUser,
                    userId: savedUser.id,
                    fullName: profileData.fullName || savedUser.fullName || '',
                    specialization: profileData.specialization || 'General Practice',
                    licenseNumber: profileData.licenseNumber || 'PENDING',
                    experience: Number(profileData.experience?.split('-')[0]) || 0,
                    isApproved: false,
                });
            }
            await this.doctorProfileRepository.save(doctorProfile);
        }
        return savedUser;
    }
    async findOne(email) {
        return this.usersRepository.findOne({
            where: { email: email.toLowerCase() },
            relations: ['patientProfile', 'doctorProfile'],
        });
    }
    async findById(id) {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['patientProfile', 'doctorProfile'],
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_profile_entity_1.PatientProfile)),
    __param(2, (0, typeorm_1.InjectRepository)(doctor_profile_entity_1.DoctorProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map