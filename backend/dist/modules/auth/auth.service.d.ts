import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: import("../users/entities/user.entity").User;
    }>;
    signup(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    getProfile(userId: string): Promise<import("../users/entities/user.entity").User | null>;
}
