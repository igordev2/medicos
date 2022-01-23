import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../entities/specialty.entity';

@Injectable()
export class DeleteSpecialtyUseCase {
  constructor(
    @InjectRepository(Specialty)
    private readonly repository: Repository<Specialty>,
  ) {}

  async execute(id: string) {
    const specialtyExists = await this.repository.findOne(id);

    if (!specialtyExists)
      throw new NotFoundException('Specialty does not exists!');

    await this.repository.softDelete(specialtyExists);
  }
}
