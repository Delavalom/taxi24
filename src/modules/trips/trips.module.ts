import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { DriversModule } from '../drivers/drivers.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  controllers: [TripsController],
  providers: [TripsService, PrismaService],
  imports: [DriversModule],
})
export class TripsModule {}
