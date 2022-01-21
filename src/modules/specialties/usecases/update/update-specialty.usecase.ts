import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateSpecialtiesDto } from '../../dtos/update-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';
import { SpecialtiesRepository } from '../../repository/specialties.repository';

@Injectable()
export class UpdateSpecialtiesUseCase {
  constructor(private readonly repository: SpecialtiesRepository) {}

  async execute(
    id: string,
    updateSpecialtiesDto: UpdateSpecialtiesDto,
  ): Promise<Specialty> {
    const specialtyExistId = await this.repository.Get(id);

    if (!specialtyExistId)
      throw new BadRequestException('Specialty does not exists!');

    const specialtyExist = await this.repository.FindByDescription(
      updateSpecialtiesDto.description,
    );

    if (specialtyExist)
      throw new BadRequestException('Specialty already exists!');

    specialtyExistId.description = updateSpecialtiesDto.description;

    const updateSpecialties = await this.repository.Update(specialtyExistId);
    return updateSpecialties;
  }
}
