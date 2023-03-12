import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHolidayDto } from './dto';
import { EditHolidayDto } from './dto/edit-holiday.dto';

@Injectable()
export class HolidayService {
    constructor(private prisma: PrismaService){}

    getHolidays(userId:number){
        return this.prisma.holiday.findMany({
            where: {
                userId,
            }
        })
    }

    async createHoliday(userId: number, dto: CreateHolidayDto){
        const holiday = await this.prisma.holiday.create({
            data: {
                userId,
                startingDate: new Date(dto.startingDate),
                endingDate: new Date(dto.endingDate),
                returnDate: new Date(dto.returnDate),
                description: dto.description,
                type: dto.type,
                numberOfDays: dto.numberOfDays
            }
        });
        
        return holiday;
    }

    getHolidayById(userId:number, holidayId: number){
        return this.prisma.holiday.findFirst({
            where: {
                userId,
                id: holidayId,
            }
        })
    }

    async editHolidayById(userId:number, holidayId: number, dto:EditHolidayDto){
        const holiday = await this.prisma.holiday.findUnique({
            where: {
                id: holidayId,
            }
        });

        if (!holidayId || holiday.userId !== userId) {
            throw new ForbiddenException("Access to the data denied")
        }

        return this.prisma.holiday.update({
            where: {
                id: holidayId,
            },
            data: {
                startingDate: new Date(dto.startingDate),
                endingDate: new Date(dto.endingDate),
                returnDate: new Date(dto.returnDate),
                description: dto.description,
                type: dto.type,
                numberOfDays: dto.numberOfDays,
            }
        });
    }

    async deleteHoliday(holidayId: number, userId:number){
        const holiday = await this.prisma.holiday.findUnique({
            where: {
                id: holidayId,
            }
        });

        if (!holiday || holiday.userId !== userId) {
            throw new ForbiddenException("Access to the data denied")
        }

        await this.prisma.holiday.delete({
            where: {
                id: holidayId,
            }
        })
    }
}
