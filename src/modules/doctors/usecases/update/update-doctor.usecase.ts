import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressUseCase } from '../../../addresses/usecases/create/create-address.usecase';
import { Specialty } from '../../../specialties/entities/specialty.entity';

import { UpdateDoctorDto } from '../../dtos/update-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { ViaCep } from '../../utils/getCep';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateDoctorUseCase {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Specialty)
    private readonly repositorySpecialties: Repository<Specialty>,
    private readonly createAddressUseCase: CreateAddressUseCase,
  ) {}

  async execute(
    id: string,
    { name, crm, landline, cellPhone, specialties, zipCode }: UpdateDoctorDto,
  ) {
    const doctorExists = await this.doctorRepository.findOne(id);

    if (!doctorExists) {
      throw new NotFoundException('doctor does not exists');
    }

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

    const doctor = this.doctorRepository.save({
      id: doctorExists.id,
      name,
      crm,
      landline,
      cellPhone,
      address,
      specialties: specialtiesArray,
    });

    return doctor;
  }
}
