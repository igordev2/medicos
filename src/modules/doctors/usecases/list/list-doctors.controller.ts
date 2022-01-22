import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListDoctorsUseCase } from './list-doctors.usecase';

@Controller('api/v1/doctors')
export class ListDoctorsController {
  constructor(private readonly listDoctors: ListDoctorsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    return await this.listDoctors.execute();
  }
}
