import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName?: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    passsword?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    gender?: string;
}