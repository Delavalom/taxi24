import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePassengerDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
