import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { GetAllDriversDto } from './dto/get-all-drivers.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from '@prisma/client';
import { getLonLat } from '../../common/utils/geLonLat';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}
  async create({ name, location }: CreateDriverDto) {
    const [longitud, latitude] = getLonLat(location);

    await this.prismaService.$executeRaw`INSERT INTO drivers
    (name, location) 
    VALUES (
      ${name},
      (ST_SetSRID(ST_MakePoint(${longitud}::double precision, ${latitude}::double precision), 4326))
    );`;
    return;
  }

  async findAll({ limit = 10, page = 1, status }: GetAllDriversDto) {
    const data = await this.prismaService.driver.findMany({
      take: limit,
      skip: (page - 1) * 10,
      where: {
        status,
      },
    });

    return { data };
  }

  async findAllByRatio(location: string, ratio: number = 3) {
    const [longitud, latitude] = getLonLat(location);

    return this.prismaService.$queryRaw<Driver[]>`
      SELECT id, name, status, ST_AsText(location, 4)
      FROM drivers
      WHERE ST_DWithin(
          ST_Transform(location, 3857),
          ST_Transform(ST_SetSRID(ST_MakePoint(${longitud}::double precision, ${latitude}::double precision), 4326), 3857),
          ${ratio * 1000}
      );
    `;
  }

  async findNearbyDrivers(location: string, limit: number) {
    const [longitud, latitude] = getLonLat(location);

    return this.prismaService.$queryRaw<Driver[]>`SELECT name,
      ST_AsText(location, 4),
      Round(ST_DistanceSphere(location, ST_SetSRID(ST_MakePoint(${longitud}::double precision, ${latitude})::double precision, 4326))) AS distance
      FROM
          drivers
      WHERE
        status = 'active'
      ORDER BY
          distance
      LIMIT
          ${limit};
    `;
  }

  findOne(id: number) {
    return this.prismaService.driver.findFirst({ where: { id } });
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return this.prismaService.driver.update({
      where: { id },
      data: updateDriverDto,
    });
  }

  remove(id: number) {
    return this.prismaService.driver.delete({ where: { id } });
  }
}
