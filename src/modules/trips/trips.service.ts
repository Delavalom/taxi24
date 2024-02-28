import { Injectable, NotFoundException } from '@nestjs/common';
import { TripStatus } from '../../common/enums/trips.status.enum';
import { getLonLat } from '../../common/utils/geLonLat';
import { PrismaService } from '../../services/prisma.service';
import { BillsService } from '../bills/bills.service';
import { DriversService } from '../drivers/drivers.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { GetAllTripsDto } from './dto/get-all-trips.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    private prismaService: PrismaService,
    private driversService: DriversService,
    private billsService: BillsService,
  ) {}
  async create({ passengerId, startingPoint, endingPoint }: CreateTripDto) {
    const drivers = await this.driversService.findNearbyDrivers(
      startingPoint,
      3,
    );

    if (drivers.length < 1 || !drivers[0])
      throw new NotFoundException('not available drivers found');

    const firstDriver = drivers[0].id;
    const [starting_longitud, starting_latitude] = getLonLat(startingPoint);
    const [ending_longitud, ending_latitude] = getLonLat(endingPoint);

    await this.prismaService.$executeRaw`INSERT INTO trips
    (passenger_id, driver_id, starting_point, ending_point) 
    VALUES (
      ${passengerId},
      ${firstDriver},
      (ST_SetSRID(ST_MakePoint(${starting_longitud}::double precision, ${starting_latitude}::double precision), 4326)),
      (ST_SetSRID(ST_MakePoint(${ending_longitud}::double precision, ${ending_latitude}::double precision), 4326))
    );`;

    return;
  }

  findAll({ limit = 10, page = 1, status }: GetAllTripsDto) {
    return this.prismaService.trip.findMany({
      take: limit,
      skip: (page - 1) * 10,
      where: {
        status,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.trip.findFirst({ where: { id } });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return this.prismaService.$transaction(
      async (tx) => {
        // eslint-disable-next-line prettier/prettier
        const trips = await tx.$queryRaw<{ distance: number }[]>`SELECT 
      Round(ST_DistanceSphere(starting_point, ending_point)) AS distance
      FROM
          trips
      WHERE
        id = ${id}
      LIMIT
          1;
    `;

        if (updateTripDto.status === TripStatus.COMPLETED && trips[0]) {
          await this.billsService.create(id, {
            amount: trips[0].distance * 1.445,
          });
        }

        tx.trip.update({
          where: { id },
          data: updateTripDto,
        });
      },
      { isolationLevel: 'Serializable' },
    );
  }
}
