import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [BillsController],
  providers: [BillsService, PrismaService],
})
export class BillsModule {}
