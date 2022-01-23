import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialtiesDto } from '../../dtos/create-specialties.dto';
import { Specialty } from '../../entities/specialty.entity';

@Injectable()
export class CreateSpecialtyUseCase {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtiesRepository: Repository<Specialty>,
  ) {}

  async execute({ description }: CreateSpecialtiesDto): Promise<Specialty> {
    const specialtyExist = await this.specialtiesRepository.findOne({
      description,
    });

    if (specialtyExist)
      throw new BadRequestException('Specialty already exists!');

    const specialties = this.specialtiesRepository.create(
      await this.specialtiesRepository.save(new Specialty(description)),
    );
    return specialties;
  }
}
