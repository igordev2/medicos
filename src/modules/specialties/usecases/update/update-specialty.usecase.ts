import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSpecialtiesDto } from '../../dtos/update-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';

@Injectable()
export class UpdateSpecialtyUseCase {
  constructor(
    @InjectRepository(Specialty)
    private readonly repository: Repository<Specialty>,
  ) {}

  async execute(
    id: string,
    updateSpecialtiesDto: UpdateSpecialtiesDto,
  ): Promise<Specialty> {
    const specialtyExistId = await this.repository.findOne(id);

    if (!specialtyExistId)
      throw new NotFoundException('Specialty does not exists!');

    const specialtyExistDescription = await this.repository.find({
      description: updateSpecialtiesDto.description,
    });

    if (specialtyExistDescription)
      throw new BadRequestException('Specialty already exists!');

    specialtyExistId.description = updateSpecialtiesDto.description;

    const updateSpecialties = await this.repository.merge(specialtyExistId);
    return updateSpecialties;
  }
}
