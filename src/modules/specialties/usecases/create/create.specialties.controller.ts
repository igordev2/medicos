import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateSpecialtiesDto } from '../../dtos/create-specialties.dto';
import { CreateSpecialtiesUseCase } from './create.specialties.usecase';

@Controller('api/v1/specialties')
export class CreateSpecialtiesController {
  constructor(private readonly createSpecialties: CreateSpecialtiesUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() createSpecialtiesDto: CreateSpecialtiesDto) {
    return await this.createSpecialties.execute(createSpecialtiesDto);
  }
}
