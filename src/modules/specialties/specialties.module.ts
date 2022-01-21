import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { SpecialtiesRepository } from './repository/specialties.repository';
import { ListSpecialties } from './usecases/list/list.specialties';
import { ListSpecialtiesController } from './usecases/list/list.specialties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty, SpecialtiesRepository])],
  controllers: [ListSpecialtiesController],
  providers: [ListSpecialties],
})
export class SpecialtiesModule {}
