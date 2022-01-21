import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Specialty } from '../entities/specialty.entity';
import { ISpecialtiesRepository } from './specialties.interface';

@EntityRepository(Specialty)
export class SpecialtiesRepository
  extends Repository<Specialty>
  implements ISpecialtiesRepository
{
  async Create(entity: Specialty): Promise<Specialty> {
    const entityCreate = await this.save(this.create(entity));

    return entityCreate;
  }

  async Update(entity: Specialty): Promise<Specialty> {
    const entityUpdate = this.merge(entity);
    await this.save(entityUpdate);

    return entityUpdate;
  }

  async Delete(id: string): Promise<void> {
    const entity = await this.Get(id);

    await this.softDelete(entity);
  }

  async Get(id: string): Promise<Specialty> {
    try {
      return await this.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async GetAll(): Promise<Specialty[]> {
    return await this.find();
  }
}
