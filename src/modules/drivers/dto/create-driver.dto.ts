import { IsLatLong, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsLatLong()
  location: string;
}
