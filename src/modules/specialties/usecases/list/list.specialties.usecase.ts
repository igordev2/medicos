import { Injectable } from '@nestjs/common';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';

@Injectable()
export class ListSpecialtiesUseCase {
  constructor(private readonly repository: SpecialtiesRepository) {}

  async execute(): Promise<Specialty[]> {
    const specialties = await this.repository.GetAll();
    return specialties;
  }
}
