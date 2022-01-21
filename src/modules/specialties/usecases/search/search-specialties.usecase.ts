import { Injectable } from '@nestjs/common';
import { SpecialtiesRepository } from '../../repository/specialties.repository';
import { ITypeQuery } from './ITypeQuery';

@Injectable()
export class SearchSpecialtiesUseCase {
  constructor(private readonly specialtiesRepository: SpecialtiesRepository) {}

  async execute(query: ITypeQuery) {
    return this.specialtiesRepository.find({
      where: [{ id: query.id }, { description: query.description }],
    });
  }
}
