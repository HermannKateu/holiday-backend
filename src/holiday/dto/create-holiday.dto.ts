import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

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

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    numberOfDays: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}