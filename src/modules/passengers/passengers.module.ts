import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [PassengersController],
  providers: [PassengersService, PrismaService],
  exports: [PassengersService],
})
export class PassengersModule {}
