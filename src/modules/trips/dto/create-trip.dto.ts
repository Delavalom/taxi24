import { IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNumber()
  passengerId: number;

  @IsNumber()
  driverId: number;

  @IsString()
  endingPoint: string;

  @IsString()
  startingPoint: string;
}
