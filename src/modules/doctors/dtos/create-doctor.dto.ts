import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  crm: number;

  @IsNotEmpty()
  @IsInt()
  landline: number;

  @IsNotEmpty()
  @IsInt()
  cellPhone: number;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  specialties: string[];
}
