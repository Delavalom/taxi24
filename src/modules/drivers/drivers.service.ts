import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { GetAllDriversDto } from './dto/get-all-drivers.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}
  create(createDriverDto: CreateDriverDto) {
    return this.prismaService.driver.create({ data: createDriverDto });
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
