import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/modules/addresses/entities/address.entity';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';
import { AddressesModule } from '../addresses/addresses.module';
import { SpecialtiesRepository } from '../specialties/repository/specialties.repository';
import { SpecialtiesModule } from '../specialties/specialties.module';
import { Doctor } from './entities/doctor.entity';
import { DoctorsRepository } from './repository/doctors.repository';
import { CreateDoctorController } from './usecases/create/create-doctor.controller';
import { CreateDoctorUseCase } from './usecases/create/create-doctor.usecase';
import { ListDoctorsController } from './usecases/list/list-doctors.controller';
import { ListDoctorsUseCase } from './usecases/list/list-doctors.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Doctor,
      Address,
      Specialty,
      DoctorsRepository,
      SpecialtiesRepository,
    ]),
    SpecialtiesModule,
    AddressesModule,
  ],
  controllers: [CreateDoctorController, ListDoctorsController],
  providers: [CreateDoctorUseCase, ListDoctorsUseCase],
})
export class DoctorsModule {}
