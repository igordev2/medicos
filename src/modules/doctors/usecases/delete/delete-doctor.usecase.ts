import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from '../../../addresses/repository/addresses.repository';
import { DoctorsRepository } from '../../repository/doctors.repository';

@Injectable()
export class DeleteDoctorUseCase {
  constructor(
    private readonly doctorsRepository: DoctorsRepository,
    private readonly addressesRepository: AddressesRepository,
  ) {}

  async execute(id: string) {
    const doctorExists = await this.doctorsRepository.Get(id);
    if (!doctorExists) {
      throw new NotFoundException('Doctor does not exists!');
    }

    await this.addressesRepository.softDelete(doctorExists.address.id);
    await this.doctorsRepository.softDelete(doctorExists.id);
  }
}
