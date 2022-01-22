import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { DoctorsRepository } from '../../repository/doctors.repository';

@Injectable()
export class SearchDoctorUseCase {
  constructor(private readonly repository: DoctorsRepository) {}

  async execute(query: any) {
    const doctors = await this.repository.find({
      relations: ['address'],
      where: [
        { name: Like(`%${query.name}%`) },
        { crm: Like(`%${query.crm}%`) },
        { landline: Like(`%${query.landLine}%`) },
        { cellPhone: Like(`%${query.cellPhone}%`) },
      ],
    });

    return doctors;
  }
}
