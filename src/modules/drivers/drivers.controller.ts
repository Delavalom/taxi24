import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { GetAllDriversDto } from './dto/get-all-drivers.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  findAll(@Query() getAllDriversDto: GetAllDriversDto) {
    return this.driversService.findAll(getAllDriversDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.driversService.remove(id);
  }
}
