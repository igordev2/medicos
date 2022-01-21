import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new NotFoundException('Specialty does not exists!');

    const specialtyExistDescription = await this.repository.FindByDescription(
      updateSpecialtiesDto.description,
    );

    if (specialtyExistDescription)
      throw new BadRequestException('Specialty already exists!');

    specialtyExistId.description = updateSpecialtiesDto.description;

    const updateSpecialties = await this.repository.Update(specialtyExistId);
    return updateSpecialties;
  }
}
