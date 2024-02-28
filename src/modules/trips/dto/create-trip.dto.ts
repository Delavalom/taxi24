import { IsLatLong, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNumber()
  passengerId: number;

  @IsLatLong()
  @IsNotEmpty()
  @IsString()
  startingPoint: string;

  @IsLatLong()
  @IsNotEmpty()
  @IsString()
  endingPoint: string;
}
