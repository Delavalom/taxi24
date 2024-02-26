import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateBillDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;
}
