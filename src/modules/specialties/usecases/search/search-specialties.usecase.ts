import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuerySpecialtiesDto } from '../../dtos/query-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';

@Injectable()
export class SearchSpecialtiesUseCase {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtiesRepository: Repository<Specialty>,
  ) {}

  async execute(query: QuerySpecialtiesDto) {
    return this.specialtiesRepository.find({
      where: [{ id: query.id }, { description: query.description }],
    });
  }
}
