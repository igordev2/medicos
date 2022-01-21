import { IsString } from 'class-validator';

export class CreateSpecialtiesDto {
  @IsString()
  description: string;
}
