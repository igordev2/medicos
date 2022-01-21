import { Specialty } from '../entities/specialty.entity';

export interface ISpecialtiesRepository {
  Create(entity: Specialty): Promise<Specialty>;
  Update(entity: Specialty): Promise<Specialty>;
  Delete(id: string): Promise<void>;
  Get(id: string): Promise<Specialty>;
  GetAll(): Promise<Specialty[]>;
}
