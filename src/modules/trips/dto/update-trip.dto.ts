import { IsEnum, IsOptional } from 'class-validator';
import { TripStatus } from '../../../common/enums/trips.status.enum';

export class UpdateTripDto {
  @IsEnum(TripStatus)
  @IsOptional()
  status?: TripStatus;
}
