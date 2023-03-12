import { Module } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';

@Module({
  providers: [HolidayService],
  controllers: [HolidayController]
})
export class HolidayModule {}
