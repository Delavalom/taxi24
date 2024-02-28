import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { DriversService } from '../drivers/drivers.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { getLonLat } from '../../common/utils/geLonLat';

@Injectable()
export class TripsService {
  constructor(
    private prismaService: PrismaService,
    private driversService: DriversService,
  ) {}
  async create({ passengerId, startingPoint, endingPoint }: CreateTripDto) {
    const drivers = await this.driversService.findNearbyDrivers(
      startingPoint,
      3,
    );

    if (drivers.length < 1)
      throw new NotFoundException('not available drivers found');

    const [starting_longitud, starting_latitude] = getLonLat(startingPoint);
    const [ending_longitud, ending_latitude] = getLonLat(endingPoint);

    await this.prismaService.$executeRaw`INSERT INTO drivers
    (passenger_id, driver_id, starting_point, ending_point) 
    VALUES (
      ${passengerId},
      ${drivers[0]?.id},
      (ST_SetSRID(ST_MakePoint(${starting_longitud}::double precision, ${starting_latitude}::double precision), 4326)),
      (ST_SetSRID(ST_MakePoint(${ending_longitud}::double precision, ${ending_latitude}::double precision), 4326))
    );`;

    return;
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
