import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NestExceptionSwagger } from '../../../common/swagger/NestExceptionSwagger';
import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { UpdateDoctorUseCase } from './update-doctor.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class UpdateDoctorController {
  constructor(private readonly updateDoctor: UpdateDoctorUseCase) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update doctor' })
  @ApiResponse({
    status: 200,
    description: 'updated doctor',
    type: Doctor,
  })
  @ApiResponse({
    status: 404,
    description: 'Specialty is invalid at position [i]',
    type: NestExceptionSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor is invalid at position [i]',
    type: NestExceptionSwagger,
  })
  async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return await this.updateDoctor.execute(id, createDoctorDto);
  }
}
