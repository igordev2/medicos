import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NestExceptionSwagger } from '../../../common/swagger/NestExceptionSwagger';
import { DeleteSpecialtyUseCase } from './delete-specialty.usecase';

@Controller('api/v1/specialties')
@ApiTags('Specialties')
export class DeleteSpecialtyController {
  constructor(private readonly deleteSpecialty: DeleteSpecialtyUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete specialty' })
  @ApiResponse({
    status: 204,
    description: 'specialty removed',
  })
  @ApiResponse({
    status: 400,
    description: 'Specialty does not exists!',
    type: NestExceptionSwagger,
  })
  async handle(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteSpecialty.execute(id);
  }
}
