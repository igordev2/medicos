import { Injectable, NotFoundException } from '@nestjs/common';
import { Address } from '../../../addresses/entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '../../entities/doctor.entity';

@Injectable()
export class DeleteDoctorUseCase {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorsRepository: Repository<Doctor>,
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {}

  async execute(id: string) {
    const doctorExists = await this.doctorsRepository.findOne(id);
    if (!doctorExists) {
      throw new NotFoundException('Doctor does not exists!');
    }

    await this.addressesRepository.softDelete(doctorExists.address.id);
    await this.doctorsRepository.softDelete(doctorExists.id);
  }
}
