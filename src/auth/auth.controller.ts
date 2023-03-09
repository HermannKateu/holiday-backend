import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("/signup")
    async singUp(): Promise<unknown> {
        return await this.authService.singUp();
    }

    @Post("/signin")
    async singIn(): Promise<unknown> {
        return await this.authService.singIn();
    }
}
