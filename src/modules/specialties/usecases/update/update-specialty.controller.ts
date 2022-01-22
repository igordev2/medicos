import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateSpecialtiesDto } from '../../dtos/update-specialties.dto';
import { UpdateSpecialtiesUseCase } from './update-specialty.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class UpdateSpecialtiesController {
  constructor(private readonly updateSpecialties: UpdateSpecialtiesUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update specialty' })
  async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSpecialtiesDto: UpdateSpecialtiesDto,
  ) {
    return this.updateSpecialties.execute(id, updateSpecialtiesDto);
  }
}
