import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchDoctorUseCase } from './search-doctor.usecase';

@Controller('api/v1/doctors')
@ApiTags('Doctors')
export class SearchDoctorController {
  constructor(private readonly searchDoctor: SearchDoctorUseCase) {}

  @Get('search')
  @ApiOperation({ summary: 'search doctors' })
  async handle(@Query() query: any) {
    return await this.searchDoctor.execute(query);
  }
}
