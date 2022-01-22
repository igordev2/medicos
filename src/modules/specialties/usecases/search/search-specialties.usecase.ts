import { Injectable } from '@nestjs/common';
import { QuerySpecialtiesDto } from '../../dtos/query-specialties.dto';
import { SpecialtiesRepository } from '../../repository/specialties.repository';

@Injectable()
export class SearchSpecialtiesUseCase {
  constructor(private readonly specialtiesRepository: SpecialtiesRepository) {}

  async execute(query: QuerySpecialtiesDto) {
    return this.specialtiesRepository.find({
      where: [{ id: query.id }, { description: query.description }],
    });
  }
}
