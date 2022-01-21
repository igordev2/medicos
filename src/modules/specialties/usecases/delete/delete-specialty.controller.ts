import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DeleteSpecialtyUseCase } from './delete-specialty.usecase';

@Controller('api/v1/specialties')
export class DeleteSpecialtyController {
  constructor(private readonly deleteSpecialty: DeleteSpecialtyUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteSpecialty.execute(id);
  }
}
