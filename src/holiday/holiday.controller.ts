import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Get, Delete, Patch } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateHolidayDto } from './dto';
import { EditHolidayDto } from './dto/edit-holiday.dto';
import { HolidayService } from './holiday.service';

@UseGuards(JwtGuard)
@Controller('holidays')
export class HolidayController {
    constructor(private holiday: HolidayService){}

    @Get()
    getHolidays(@GetUser("id") userId:number){
        return this.holiday.getHolidays(userId)
    }

    @Post("holiday")
    createHoliday(@GetUser("id") userId: number, @Body() dto:CreateHolidayDto){
        return this.holiday.createHoliday(
            userId,
            dto,
        )
    };

    @Get(":id")
    getHolidayById(
        @GetUser("id") userId: number ,
        @Param("id", ParseIntPipe)
        holidayId: number
    ){
        return this.holiday.getHolidayById(userId,holidayId)
    }

    @Patch(":id")
    editHolidayById(
        @GetUser("id") userId: number,
         @Param("id", ParseIntPipe) holidayId:number, 
         @Body() dto:EditHolidayDto
    ){
        return this.holiday.editHolidayById(
            userId,
            holidayId,
            dto
        )
    }

    @Delete(":id")
    deleteHoliday(@GetUser("id") userId: number ,
    @Param("id", ParseIntPipe) holidayId:number){
        return this.holiday.deleteHoliday(
            userId,
            holidayId,
        )
    }
}
