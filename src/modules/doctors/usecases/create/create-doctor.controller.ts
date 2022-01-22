import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { CreateDoctorUseCase } from './create-doctor.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class CreateDoctorController {
  constructor(private readonly createDoctor: CreateDoctorUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.createDoctor.execute(createDoctorDto);
  }
}
