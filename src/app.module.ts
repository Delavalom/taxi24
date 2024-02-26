import { Module } from '@nestjs/common';
import { BillsModule } from './modules/bills/bills.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { PassengersModule } from './modules/passengers/passengers.module';
import { TripsModule } from './modules/trips/trips.module';

@Module({
  imports: [TripsModule, DriversModule, PassengersModule, BillsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
