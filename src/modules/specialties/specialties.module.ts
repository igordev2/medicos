import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { CreateSpecialtyController } from './usecases/create/create.specialty.controller';
import { CreateSpecialtyUseCase } from './usecases/create/create.specialty.usecase';
import { DeleteSpecialtyController } from './usecases/delete/delete-specialty.controller';
import { DeleteSpecialtyUseCase } from './usecases/delete/delete-specialty.usecase';
import { ListSpecialtiesController } from './usecases/list/list-specialties.controller';
import { ListSpecialtiesUseCase } from './usecases/list/list-specialties.usecase';
import { SearchSpecialtiesController } from './usecases/search/search-specialties.controller';
import { SearchSpecialtiesUseCase } from './usecases/search/search-specialties.usecase';
import { UpdateSpecialtyController } from './usecases/update/update-specialty.controller';
import { UpdateSpecialtyUseCase } from './usecases/update/update-specialty.usecase';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  controllers: [
    CreateSpecialtyController,
    UpdateSpecialtyController,
    ListSpecialtiesController,
    DeleteSpecialtyController,
    SearchSpecialtiesController,
  ],
  providers: [
    CreateSpecialtyUseCase,
    UpdateSpecialtyUseCase,
    ListSpecialtiesUseCase,
    DeleteSpecialtyUseCase,
    SearchSpecialtiesUseCase,
  ],
})
export class SpecialtiesModule {}
