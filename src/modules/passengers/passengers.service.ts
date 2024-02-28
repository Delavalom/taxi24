import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { GetAllPassengersDto } from './dto/get-all-passengers.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { getLonLat } from '../../common/utils/geLonLat';

@Injectable()
export class PassengersService {
  constructor(private prismaService: PrismaService) {}

  async create({ name, location }: CreatePassengerDto) {
    const [longitud, latitude] = getLonLat(location);

    await this.prismaService.$executeRaw`INSERT INTO passengers 
    (name, location) 
    VALUES (
      ${name},
      (ST_SetSRID(ST_MakePoint(${longitud}::double precision, ${latitude}::double precision), 4326))
    );`;
    return;
  }

  async findAll({ limit = 10, page = 1 }: GetAllPassengersDto) {
    const data = await this.prismaService.passenger.findMany({
      take: limit,
      skip: (page - 1) * 10,
    });

    return { data };
  }

  findOne(id: number) {
    return this.prismaService.passenger.findFirst({ where: { id } });
  }

  update(id: number, updatePassengerDto: UpdatePassengerDto) {
    return this.prismaService.passenger.update({
      where: { id },
      data: updatePassengerDto,
    });
  }

  remove(id: number) {
    return this.prismaService.passenger.delete({ where: { id } });
  }
}
