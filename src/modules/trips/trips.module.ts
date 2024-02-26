import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { PassengersModule } from '../passengers/passengers.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  controllers: [TripsController],
  providers: [TripsService, PrismaService],
  imports: [PassengersModule],
})
export class TripsModule {}
