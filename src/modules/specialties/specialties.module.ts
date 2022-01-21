import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { SpecialtiesRepository } from './repository/specialties.repository';
import { CreateSpecialtiesController } from './usecases/create/create.specialties.controller';
import { CreateSpecialtiesUseCase } from './usecases/create/create.specialties.usecase';
import { ListSpecialtiesController } from './usecases/list/list-specialties.controller';
import { ListSpecialtiesUseCase } from './usecases/list/list-specialties.usecase';
import { UpdateSpecialtiesController } from './usecases/update/update-specialties.controller';
import { UpdateSpecialtiesUseCase } from './usecases/update/update-specialties.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty, SpecialtiesRepository])],
  controllers: [
    CreateSpecialtiesController,
    UpdateSpecialtiesController,
    ListSpecialtiesController,
  ],
  providers: [
    CreateSpecialtiesUseCase,
    UpdateSpecialtiesUseCase,
    ListSpecialtiesUseCase,
  ],
})
export class SpecialtiesModule {}
