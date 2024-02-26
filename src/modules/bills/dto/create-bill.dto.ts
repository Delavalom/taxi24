import { IsNumber, IsOptional } from 'class-validator';

export class CreateBillDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  paid?: boolean;
}
