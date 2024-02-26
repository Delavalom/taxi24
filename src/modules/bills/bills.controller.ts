import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetAllBillsDto } from './dto/get-all-bills.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billsService.create(createBillDto);
  }

  @Get()
  findAll(@Query() getAllBillsDto: GetAllBillsDto) {
    return this.billsService.findAll(getAllBillsDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.billsService.findOne(+id);
  }
}
