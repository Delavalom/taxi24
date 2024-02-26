import { Injectable } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class PassengersService {
  constructor(private prismaService: PrismaService) {}
  create(createPassengerDto: CreatePassengerDto) {
    return this.prismaService.passenger.create({
      data: createPassengerDto,
    });
  }

  findAll() {
    return this.prismaService.passenger.findMany();
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
