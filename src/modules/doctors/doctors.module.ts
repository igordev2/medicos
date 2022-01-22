import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/modules/addresses/entities/address.entity';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';
import { Doctor } from './entities/doctor.entity';
import { DoctorsRepository } from './repository/doctors.repository';
import { ListDoctorsController } from './usecases/list/list-doctors.controller';
import { ListDoctorsUseCase } from './usecases/list/list-doctors.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Address, Specialty, DoctorsRepository]),
  ],
  controllers: [ListDoctorsController],
  providers: [ListDoctorsUseCase],
})
export class DoctorsModule {}
