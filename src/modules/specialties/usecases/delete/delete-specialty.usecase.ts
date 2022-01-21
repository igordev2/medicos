import { Injectable, NotFoundException } from '@nestjs/common';
import { SpecialtiesRepository } from '../../repository/specialties.repository';

@Injectable()
export class DeleteSpecialtyUseCase {
  constructor(private readonly repository: SpecialtiesRepository) {}

  async execute(id: string) {
    const specialtyExists = await this.repository.Get(id);

    if (!specialtyExists)
      throw new NotFoundException('Specialty does not exists!');

    await this.repository.softDelete(specialtyExists);
  }
}
