import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListSpecialtiesUseCase } from './list-specialties.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class ListSpecialtiesController {
  constructor(private readonly listSpecialties: ListSpecialtiesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    return await this.listSpecialties.execute();
  }
}
