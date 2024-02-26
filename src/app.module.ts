import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './modules/trips/trips.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { PassengersModule } from './modules/passengers/passengers.module';
import { BillsModule } from './modules/bills/bills.module';

@Module({
  imports: [TripsModule, DriversModule, PassengersModule, BillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
