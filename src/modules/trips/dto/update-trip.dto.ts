import { IsEnum, IsOptional } from 'class-validator';
import { TripStatus } from 'src/common/enums/trips.status.enum';

export class UpdateTripDto {
  @IsEnum(TripStatus)
  @IsOptional()
  status?: TripStatus;
}
