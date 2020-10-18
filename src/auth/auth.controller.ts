import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto, AuthResponse } from 'src/models/auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authServices: AuthService
    ) {}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) credentials: SignUpDto
    ): Promise<AuthResponse> {
        return await this.authServices.signUp(credentials);
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentials: SignInDto
    ): Promise<{ token: string }> {
        return await this.authServices.signIn(credentials);
    }
}
