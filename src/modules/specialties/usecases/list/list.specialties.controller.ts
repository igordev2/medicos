import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListSpecialties } from './list.specialties';

@Controller('api/v1/specialties')
export class ListSpecialtiesController {
  constructor(private readonly listSpecialties: ListSpecialties) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    return await this.listSpecialties.execute();
  }
}
