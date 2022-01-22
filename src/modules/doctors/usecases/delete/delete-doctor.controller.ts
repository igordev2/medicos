import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteDoctorUseCase } from './delete-doctor.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class DeleteDoctorController {
  constructor(private readonly deleteDoctor: DeleteDoctorUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete doctor' })
  async handle(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteDoctor.execute(id);
  }
}
