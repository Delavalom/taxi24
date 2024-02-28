import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { TripStatus } from '../../../common/enums/trips.status.enum';

export class GetAllTripsDto {
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
  @IsEnum(TripStatus)
  status?: TripStatus;
}
