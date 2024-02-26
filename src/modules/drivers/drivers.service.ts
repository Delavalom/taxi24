import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}
  create(createDriverDto: CreateDriverDto) {
    return this.prismaService.driver.create({ data: createDriverDto });
  }

  findAll() {
    return this.prismaService.driver.findMany();
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
