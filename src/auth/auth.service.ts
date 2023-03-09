import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    
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
            return user;
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

        const passwordMatches = await argon.verify(user.password, user.hash)
        return await this.prisma
    }
}
