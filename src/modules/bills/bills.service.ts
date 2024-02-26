import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class BillsService {
  constructor(private prismaService: PrismaService) {}

  create(createBillDto: CreateBillDto) {
    return this.prismaService.bill.create({ data: createBillDto });
  }

  findAll() {
    return this.prismaService.bill.findMany();
  }

  findOne(id: number) {
    return this.prismaService.bill.findFirst({ where: { id } });
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return this.prismaService.bill.update({
      where: { id },
      data: updateBillDto,
    });
  }

  remove(id: number) {
    return this.prismaService.bill.delete({ where: { id } });
  }
}
