import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Specialty } from '../../entities/specialty.entity';
import { ListSpecialtiesUseCase } from './list-specialties.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class ListSpecialtiesController {
  constructor(private readonly listSpecialties: ListSpecialtiesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'list specialties' })
  @ApiResponse({
    status: 200,
    description: 'list specialties',
    type: [Specialty],
  })
  async handle() {
    return await this.listSpecialties.execute();
  }
}
