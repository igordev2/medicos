import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuerySpecialtiesDto } from '../../dtos/query-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { SearchSpecialtiesUseCase } from './search-specialties.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class SearchSpecialtiesController {
  constructor(private readonly searchSpecialties: SearchSpecialtiesUseCase) {}

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'search specialties' })
  @ApiResponse({
    status: 200,
    description: 'search for specialties',
    type: [Specialty],
  })
  async handle(@Query() query: QuerySpecialtiesDto) {
    return await this.searchSpecialties.execute(query);
  }
}
