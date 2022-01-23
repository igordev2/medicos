import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressUseCase } from '../../../addresses/usecases/create/create-address.usecase';
import { Specialty } from '../../../specialties/entities/specialty.entity';

import { CreateDoctorDto } from '../../dtos/create-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { ViaCep } from '../../utils/getCep';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Specialty)
    private readonly repositorySpecialties: Repository<Specialty>,
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
      const specialtiesExist = await this.repositorySpecialties.findOne(
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

    const doctor = this.doctorRepository.create(
      await this.doctorRepository.save(
        new Doctor({
          name,
          crm,
          landline,
          cellPhone,
          address,
          specialties: specialtiesArray,
        }),
      ),
    );

    return doctor;
  }
}
