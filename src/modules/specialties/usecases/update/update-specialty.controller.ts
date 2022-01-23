import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { NestExceptionSwagger } from 'src/modules/common/swagger/NestExceptionSwagger';
import { UpdateSpecialtiesDto } from '../../dtos/update-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { UpdateSpecialtyUseCase } from './update-specialty.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class UpdateSpecialtyController {
  constructor(private readonly updateSpecialties: UpdateSpecialtyUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update specialty' })
  @ApiResponse({
    status: 200,
    description: 'updated specialty',
    type: Specialty,
  })
  @ApiResponse({
    status: 404,
    description: 'specialty does not exists!',
    // type: NestExceptionSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'specialty already exists!',
    // type: NestExceptionSwagger,
  })
  async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSpecialtiesDto: UpdateSpecialtiesDto,
  ) {
    return this.updateSpecialties.execute(id, updateSpecialtiesDto);
  }
}
