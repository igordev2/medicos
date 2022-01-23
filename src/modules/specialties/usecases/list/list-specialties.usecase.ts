import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';

@Injectable()
export class ListSpecialtiesUseCase {
  constructor(
    @InjectRepository(Specialty)
    private readonly repository: Repository<Specialty>,
  ) {}

  async execute(): Promise<Specialty[]> {
    const specialties = await this.repository.find();
    return specialties;
  }
}
