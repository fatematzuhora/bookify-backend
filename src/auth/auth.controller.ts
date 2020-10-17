import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto, AuthResponse } from 'src/models/auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authServices: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) credentials: SignUpDto): Promise<AuthResponse> {
        return this.authServices.signUp(credentials);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) credentials: SignInDto): Promise<{ token: string }> {
        return this.authServices.signIn(credentials);
    }
}
