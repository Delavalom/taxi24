import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { DriverStatus } from '../../../common/enums/drivers.status.enum';

export class GetAllDriversDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  page?: number;

  @IsOptional()
  @IsEnum(DriverStatus)
  status?: DriverStatus;
}
