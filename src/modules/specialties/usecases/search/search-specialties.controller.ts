import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ITypeQuery } from './ITypeQuery';
import { SearchSpecialtiesUseCase } from './search-specialties.usecase';

@Controller('api/v1/specialties')
export class SearchSpecialtiesController {
  constructor(private readonly searchSpecialties: SearchSpecialtiesUseCase) {}

  @Get('search')
  @HttpCode(HttpStatus.OK)
  async handle(@Query() query: ITypeQuery) {
    return await this.searchSpecialties.execute(query);
  }
}
