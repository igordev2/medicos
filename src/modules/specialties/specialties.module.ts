import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { SpecialtiesRepository } from './repository/specialties.repository';
import { CreateSpecialtiesController } from './usecases/create/create.specialty.controller';
import { CreateSpecialtiesUseCase } from './usecases/create/create.specialty.usecase';
import { DeleteSpecialtyController } from './usecases/delete/delete-specialty.controller';
import { DeleteSpecialtyUseCase } from './usecases/delete/delete-specialty.usecase';
import { ListSpecialtiesController } from './usecases/list/list-specialties.controller';
import { ListSpecialtiesUseCase } from './usecases/list/list-specialties.usecase';
import { UpdateSpecialtiesController } from './usecases/update/update-specialty.controller';
import { UpdateSpecialtiesUseCase } from './usecases/update/update-specialty.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty, SpecialtiesRepository])],
  controllers: [
    CreateSpecialtiesController,
    UpdateSpecialtiesController,
    ListSpecialtiesController,
    DeleteSpecialtyController,
  ],
  providers: [
    CreateSpecialtiesUseCase,
    UpdateSpecialtiesUseCase,
    ListSpecialtiesUseCase,
    DeleteSpecialtyUseCase,
  ],
})
export class SpecialtiesModule {}
