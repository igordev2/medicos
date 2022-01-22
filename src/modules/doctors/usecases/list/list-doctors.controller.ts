import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Doctor } from '../../entities/doctor.entity';
import { ListDoctorsUseCase } from './list-doctors.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class ListDoctorsController {
  constructor(private readonly listDoctors: ListDoctorsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'list doctors' })
  @ApiResponse({
    status: 200,
    description: 'list doctors',
    type: [Doctor],
  })
  async handle() {
    return await this.listDoctors.execute();
  }
}
