import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialtiesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
