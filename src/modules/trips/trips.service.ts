import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'src/services/prisma.service';
import { PassengersService } from '../passengers/passengers.service';

@Injectable()
export class TripsService {
  constructor(
    private prismaService: PrismaService,
    private passengersService: PassengersService,
  ) {}
  async create(createTripDto: CreateTripDto) {
    const passenger = await this.passengersService.findOne(
      createTripDto.passengerId,
    );
    const driver = await this.passengersService.findOne(createTripDto.driverId);
    if (!passenger || !driver)
      throw new NotFoundException('passenger or driver id not found');

    return this.prismaService.trip.create({
      data: {
        ...createTripDto,
        driverId: driver.id,
        passengerId: passenger.id,
      },
    });
  }

  findAll() {
    return this.prismaService.trip.findMany();
  }

  findOne(id: number) {
    return this.prismaService.trip.findFirst({ where: { id } });
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.prismaService.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  remove(id: number) {
    return this.prismaService.trip.delete({ where: { id } });
  }
}
