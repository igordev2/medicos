import { IBaseRepository } from 'src/modules/common/IBaseRepository';
import { EntityRepository, Repository } from 'typeorm';
import { Specialty } from '../entities/specialty.entity';
import { ISpecialtiesRepository } from './specialties.interface';

@EntityRepository(Specialty)
export class SpecialtiesRepository
  extends Repository<Specialty>
  implements IBaseRepository<Specialty>, ISpecialtiesRepository
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
    return await this.findOne(id);
  }

  async GetAll(): Promise<Specialty[]> {
    return await this.find();
  }

  async FindByDescription(description: string): Promise<Specialty> {
    return await this.findOne({ description });
  }
}
