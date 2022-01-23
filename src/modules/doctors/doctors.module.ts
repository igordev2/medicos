import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/modules/addresses/entities/address.entity';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Address, Specialty]),
    SpecialtiesModule,
    AddressesModule,
  ],
  controllers: [
    CreateDoctorController,
    ListDoctorsController,
    DeleteDoctorController,
    SearchDoctorController,
  ],
  providers: [
    CreateDoctorUseCase,
    ListDoctorsUseCase,
    DeleteDoctorUseCase,
    SearchDoctorUseCase,
  ],
})
export class DoctorsModule {}
