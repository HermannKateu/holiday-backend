import { IsNotEmpty, IsString } from "class-validator";

export class CreateHolidayDto {
    @IsString()
    @IsNotEmpty()
    startingDate: string;

    @IsString()
    @IsNotEmpty()
    endingDate: string;

    @IsString()
    @IsNotEmpty()
    returnDate: string;

    @IsString()
    @IsNotEmpty()
    numberOfDays: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}