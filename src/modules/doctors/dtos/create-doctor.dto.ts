import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 120)
  @ApiProperty()
  name?: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  crm?: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  landline?: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  cellPhone?: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  zipCode?: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ApiProperty()
  specialties?: string[];
}
