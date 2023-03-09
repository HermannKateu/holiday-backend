import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("signup")
    async singUp(@Body() dto:AuthDto): Promise<unknown> {
        return await this.authService.singUp(dto);
    }

    @Post("signin")
    async singIn(@Body() dto:AuthDto): Promise<unknown> {
        return await this.authService.singIn(dto);
    }
}
