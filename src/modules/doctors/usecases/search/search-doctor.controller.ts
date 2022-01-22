import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Doctor } from '../../entities/doctor.entity';
import { SearchDoctorUseCase } from './search-doctor.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class SearchDoctorController {
  constructor(private readonly searchDoctor: SearchDoctorUseCase) {}

  @Get('search')
  @ApiOperation({ summary: 'search doctors' })
  @ApiResponse({
    status: 200,
    description: 'search for doctor',
    type: [Doctor],
  })
  async handle(@Query() query: any) {
    return await this.searchDoctor.execute(query);
  }
}
