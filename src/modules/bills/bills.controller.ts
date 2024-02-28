import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BillsService } from './bills.service';
import { GetAllBillsDto } from './dto/get-all-bills.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get()
  findAll(@Query() getAllBillsDto: GetAllBillsDto) {
    return this.billsService.findAll(getAllBillsDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.billsService.findOne(id);
  }
}
