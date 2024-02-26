import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { GetAllPassengersDto } from './dto/get-all-passengers.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(private prismaService: PrismaService) {}
  create(createPassengerDto: CreatePassengerDto) {
    return this.prismaService.passenger.create({
      data: createPassengerDto,
    });
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
