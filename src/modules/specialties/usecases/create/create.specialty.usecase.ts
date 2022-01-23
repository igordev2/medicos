import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpecialtiesDto } from '../../dtos/create-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';

@Injectable()
export class CreateSpecialtyUseCase {
  constructor(private readonly repository: SpecialtiesRepository) {}

  async execute({ description }: CreateSpecialtiesDto): Promise<Specialty> {
    const specialtyExist = await this.repository.FindByDescription(description);
    if (specialtyExist)
      throw new BadRequestException('Specialty already exists!');

    const specialties = await this.repository.Create(
      new Specialty(description),
    );
    return specialties;
  }
}
