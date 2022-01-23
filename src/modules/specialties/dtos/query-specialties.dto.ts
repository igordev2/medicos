import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QuerySpecialtiesDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}
