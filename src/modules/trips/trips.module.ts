import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { DriversModule } from '../drivers/drivers.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { BillsModule } from '../bills/bills.module';

@Module({
  controllers: [TripsController],
  providers: [TripsService, PrismaService],
  imports: [DriversModule, BillsModule],
})
export class TripsModule {}
