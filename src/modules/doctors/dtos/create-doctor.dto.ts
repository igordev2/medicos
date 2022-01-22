import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 120)
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
  @IsInt()
  zipCode: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  specialties: string[];
}
