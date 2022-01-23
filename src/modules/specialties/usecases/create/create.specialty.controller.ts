import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { NestExceptionSwagger } from 'src/modules/common/swagger/NestExceptionSwagger';
import { CreateSpecialtiesDto } from '../../dtos/create-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { CreateSpecialtyUseCase } from './create.specialty.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class CreateSpecialtyController {
  constructor(private readonly createSpecialties: CreateSpecialtyUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create specialty' })
  @ApiResponse({
    status: 200,
    description: 'created specialty',
    type: Specialty,
  })
  @ApiResponse({
    status: 400,
    description: 'specialty already exists!',
    // type: NestExceptionSwagger,
  })
  async handle(@Body() createSpecialtiesDto: CreateSpecialtiesDto) {
    return await this.createSpecialties.execute(createSpecialtiesDto);
  }
}
