import { IBaseRepository } from 'src/modules/common/IBaseRepository';
import { EntityRepository, Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
import { IDoctorsRepository } from './doctors.interface';

@EntityRepository(Doctor)
export class DoctorsRepository
  extends Repository<Doctor>
  implements IBaseRepository<Doctor>, IDoctorsRepository
{
  async Create(entity: Doctor): Promise<Doctor> {
    const entityCreate = await this.save(this.create(entity));

    return entityCreate;
  }

  async Update(entity: Doctor): Promise<Doctor> {
    const entityUpdate = this.merge(entity);
    await this.save(entityUpdate);

    return entityUpdate;
  }

  async Delete(id: string): Promise<void> {
    const entity = await this.Get(id);

    await this.softDelete(entity);
  }

  async Get(id: string): Promise<Doctor> {
    return await this.findOne(id);
  }

  async GetAll(): Promise<Doctor[]> {
    return await this.find();
  }

  async FindByName(name: string): Promise<Doctor> {
    return await this.findOne({ name });
  }
}
