import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressUseCase } from 'src/modules/addresses/usecases/create/create-address.usecase';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';

import { SpecialtiesRepository } from 'src/modules/specialties/repository/specialties.repository';
import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { DoctorsRepository } from '../../repository/doctors.repository';
import { ViaCep } from '../../utils/getCep';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    private readonly repositoryDoctor: DoctorsRepository,
    private readonly repositorySpecialties: SpecialtiesRepository,
    private readonly createAddressUseCase: CreateAddressUseCase,
  ) {}

  async execute({
    name,
    crm,
    landline,
    cellPhone,
    specialties,
    zipCode,
  }: CreateDoctorDto) {
    const specialtiesArray: Specialty[] = [];

    for (let i = 0; i < specialties.length; i++) {
      const specialtiesExist = await this.repositorySpecialties.Get(
        specialties[i],
      );
      if (!specialtiesExist) {
        throw new NotFoundException(`Specialty is invalid at position [${i}]`);
      }

      specialtiesArray.push(specialtiesExist);
    }

    const { cep, logradouro, bairro, localidade, uf } = await ViaCep.getCep(
      zipCode,
    );

    const address = await this.createAddressUseCase.execute({
      zipCode: cep,
      streetAddress: logradouro,
      neighborhood: bairro,
      locality: localidade,
      uf,
    });

    const doctor = await this.repositoryDoctor.Create(
      new Doctor(name, crm, landline, cellPhone, address, specialtiesArray),
    );

    return doctor;
  }
}
