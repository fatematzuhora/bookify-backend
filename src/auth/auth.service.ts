import {
    ConflictException, InternalServerErrorException, Injectable,
    UnauthorizedException, Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { SignInDto, SignUpDto, AuthResponse } from 'src/models/auth.model';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async signUp(credentials: SignUpDto): Promise<AuthResponse> {
        const { username, email } = credentials;
            
        let user = await this.userRepo.findOne({ email });
        if (user) throw new ConflictException('Email already exist!');

        user = await this.userRepo.findOne({ username });
        if (user) throw new ConflictException('Username has already been taken!');

        try {
            const newUser = this.userRepo.create(credentials);
            await newUser.save();
            
            const payload = { username: newUser.username };
            const token = this.jwtService.sign(payload);
            
            return { ...newUser.toJSON(), token };

        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async signIn(credentials: SignInDto): Promise<{ token: string }> {
        const { email, password } = credentials;

        const user = await this.userRepo.findOne({ email });

        const isValid = await user.validatePassword(password);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials!');
        }
        
        const payload: JwtPayload = { username: user.username };
        const token = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);

        return { token };
    }

    async validateToken(jwt: string) {
        return this.jwtService.verify(jwt);
    }
}
