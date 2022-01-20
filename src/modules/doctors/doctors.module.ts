import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/modules/addresses/entities/address.entity';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';
import { Doctor } from './entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Address, Specialty])],
})
export class DoctorsModule {}
