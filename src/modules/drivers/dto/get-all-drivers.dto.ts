import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsLatLong,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';
import { DriverStatus } from '../../../common/enums/drivers.status.enum';

export class GetAllDriversDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  @IsInt()
  limit?: number;

  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  page?: number;

  @IsOptional()
  @IsEnum(DriverStatus)
  status?: DriverStatus;

  @Min(0)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  ratio?: number;

  @IsNotEmpty()
  @IsLatLong()
  @IsOptional()
  location?: string;
}
