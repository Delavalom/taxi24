import { IsLatLong, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePassengerDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsLatLong()
  location: string;
}
