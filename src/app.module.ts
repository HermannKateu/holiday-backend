import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HolidayModule } from './holiday/holiday.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule, HolidayModule, AuthModule, PrismaModule],
})
export class AppModule {}
