import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NestExceptionSwagger } from 'src/modules/common/swagger/NestExceptionSwagger';
import { DeleteDoctorUseCase } from './delete-doctor.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class DeleteDoctorController {
  constructor(private readonly deleteDoctor: DeleteDoctorUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete doctor' })
  @ApiResponse({
    status: 204,
    description: 'removed doctor',
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor does not exists!',
    type: NestExceptionSwagger,
  })
  async handle(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteDoctor.execute(id);
  }
}
