import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetAllBillsDto } from './dto/get-all-bills.dto';

@Injectable()
export class BillsService {
  constructor(private prismaService: PrismaService) {}

  create(createBillDto: CreateBillDto) {
    return this.prismaService.bill.create({ data: createBillDto });
  }

  async findAll({ limit = 10, page = 1 }: GetAllBillsDto) {
    const data = await this.prismaService.bill.findMany({
      take: limit,
      skip: (page - 1) * 10,
    });

    return { data };
  }

  findOne(id: number) {
    return this.prismaService.bill.findFirst({ where: { id } });
  }
}
