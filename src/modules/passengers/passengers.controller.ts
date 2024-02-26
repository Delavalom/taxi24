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
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { GetAllPassengersDto } from './dto/get-all-passengers.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { PassengersService } from './passengers.service';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengersService.create(createPassengerDto);
  }

  @Get()
  findAll(@Query() getAllPassengersDto: GetAllPassengersDto) {
    return this.passengersService.findAll(getAllPassengersDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.passengersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ) {
    return this.passengersService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.passengersService.remove(id);
  }
}
