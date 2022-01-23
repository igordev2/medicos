import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Doctor } from '../../entities/doctor.entity';

@Injectable()
export class SearchDoctorUseCase {
  constructor(
    @InjectRepository(Doctor) private readonly repository: Repository<Doctor>,
  ) {}

  async execute(query: any) {
    const doctors = await this.repository.find({
      relations: ['address'],
      where: [
        { name: Like(`%${query.name}%`) },
        { crm: Like(`%${query.crm}%`) },
        { landline: Like(`%${query.landLine}%`) },
        { cellPhone: Like(`%${query.cellPhone}%`) },
        {
          address: {
            zipCode: Like(`%${query.zipCode}%`),
            locality: Like(`%${query.locality}%`),
            neighborhood: Like(`%${query.neighborhood}%`),
            streetAddress: Like(`%${query.streetAddress}%`),
            uf: Like(`%${query.uf}%`),
          },
        },
      ],
    });

    return doctors;
  }
}
