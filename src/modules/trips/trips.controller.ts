import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { GetAllTripsDto } from './dto/get-all-trips.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll(@Query() getAllTripsDto: GetAllTripsDto) {
    return this.tripsService.findAll(getAllTripsDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.update(id, updateTripDto);
  }
}
