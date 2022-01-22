import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSpecialtiesDto } from '../../dtos/create-specialties.dto';
import { CreateSpecialtiesUseCase } from './create.specialty.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class CreateSpecialtiesController {
  constructor(private readonly createSpecialties: CreateSpecialtiesUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create specialty' })
  async handle(@Body() createSpecialtiesDto: CreateSpecialtiesDto) {
    return await this.createSpecialties.execute(createSpecialtiesDto);
  }
}
