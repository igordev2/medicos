import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListDoctorsUseCase } from './list-doctors.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class ListDoctorsController {
  constructor(private readonly listDoctors: ListDoctorsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'list doctors' })
  async handle() {
    return await this.listDoctors.execute();
  }
}
