import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NestExceptionSwagger } from 'src/modules/common/swagger/NestExceptionSwagger';
import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { CreateDoctorUseCase } from './create-doctor.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class CreateDoctorController {
  constructor(private readonly createDoctor: CreateDoctorUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create doctor' })
  @ApiResponse({
    status: 200,
    description: 'created doctor',
    type: Doctor,
  })
  @ApiResponse({
    status: 404,
    description: 'Specialty is invalid at position [i]',
    type: NestExceptionSwagger,
  })
  async handle(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.createDoctor.execute(createDoctorDto);
  }
}
