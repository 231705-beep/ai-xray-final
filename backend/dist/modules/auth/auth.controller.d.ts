import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: import("../users/entities/user.entity").User;
    }>;
    getProfile(req: any): Promise<import("../users/entities/user.entity").User | null>;
}
