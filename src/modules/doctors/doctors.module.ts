import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../addresses/entities/address.entity';
import { Specialty } from '../specialties/entities/specialty.entity';
import { AddressesModule } from '../addresses/addresses.module';
import { SpecialtiesModule } from '../specialties/specialties.module';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorController } from './usecases/create/create-doctor.controller';
import { CreateDoctorUseCase } from './usecases/create/create-doctor.usecase';
import { DeleteDoctorController } from './usecases/delete/delete-doctor.controller';
import { DeleteDoctorUseCase } from './usecases/delete/delete-doctor.usecase';
import { ListDoctorsController } from './usecases/list/list-doctors.controller';
import { ListDoctorsUseCase } from './usecases/list/list-doctors.usecase';
import { SearchDoctorController } from './usecases/search/search-doctor.controller';
import { SearchDoctorUseCase } from './usecases/search/search-doctor.usecase';
import { UpdateDoctorController } from './usecases/update/update-doctor.controller';
import { UpdateDoctorUseCase } from './usecases/update/update-doctor.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Address, Specialty]),
    SpecialtiesModule,
    AddressesModule,
  ],
  controllers: [
    CreateDoctorController,
    UpdateDoctorController,
    ListDoctorsController,
    DeleteDoctorController,
    SearchDoctorController,
  ],
  providers: [
    CreateDoctorUseCase,
    UpdateDoctorUseCase,
    ListDoctorsUseCase,
    DeleteDoctorUseCase,
    SearchDoctorUseCase,
  ],
})
export class DoctorsModule {}
