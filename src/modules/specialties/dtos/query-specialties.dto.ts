import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySpecialtiesDto {
  @ApiPropertyOptional()
  id?: string;

  @ApiPropertyOptional()
  description?: string;
}
