import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListSpecialtiesUseCase } from './list-specialties.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class ListSpecialtiesController {
  constructor(private readonly listSpecialties: ListSpecialtiesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'list specialties' })
  async handle() {
    return await this.listSpecialties.execute();
  }
}
