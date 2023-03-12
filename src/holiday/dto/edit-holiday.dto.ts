import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class EditHolidayDto {
    @IsString()
    @IsOptional()
    startingDate?: string;

    @IsString()
    @IsOptional()
    endingDate?: string;

    @IsString()
    @IsOptional()
    returnDate?: string;

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    numberOfDays?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    type?: string;
}