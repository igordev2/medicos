import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecialtiesDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
