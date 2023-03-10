import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
         private jwt: JwtService, 
         private configService: ConfigService
         ){}
    
    async singUp(dto: AuthDto): Promise<unknown> {
        try {
            const hash = await argon.hash(dto.password);
            const user  = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    gender: dto.gender,
                    lastName: dto.lastName,
                    firstName: dto.firstName
                }
            });
    
            delete user["hash"];
            return this.signToken(user.id, user.email);
        }
       catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === "P2002"){
                console.log("test")
                throw new ForbiddenException("User already exists");
            }
        }
       }
    }
    
    async singIn(dto: AuthDto): Promise<unknown> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if(!user){
            throw new ForbiddenException("User does not exist");
        }

        const passwordMatches = await argon.verify(user.hash, dto.password)

        if(!passwordMatches){
            throw new ForbiddenException("Incorrect password");
        }

        delete user["hash"];
        return this.signToken(user.id, user.email);;
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string; }> {
        const payload = {
            sub: userId,    
            email,
        }
        const secret = this.configService.get("JWT_SECRET");
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "6h",
            secret: secret,
        });
        return {
            access_token:  token
        }
    }
}
