import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService, PrismaService],
  exports: [DriversService],
})
export class DriversModule {}
