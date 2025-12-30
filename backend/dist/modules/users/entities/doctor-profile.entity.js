"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let DoctorProfile = class DoctorProfile {
    id;
    user;
    userId;
    fullName;
    specialization;
    licenseNumber;
    experience;
    clinicName;
    hospital;
    isApproved;
};
exports.DoctorProfile = DoctorProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DoctorProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.doctorProfile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], DoctorProfile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorProfile.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorProfile.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorProfile.prototype, "licenseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], DoctorProfile.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfile.prototype, "clinicName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DoctorProfile.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DoctorProfile.prototype, "isApproved", void 0);
exports.DoctorProfile = DoctorProfile = __decorate([
    (0, typeorm_1.Entity)()
], DoctorProfile);
//# sourceMappingURL=doctor-profile.entity.js.map