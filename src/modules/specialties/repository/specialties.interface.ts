import { Specialty } from '../entities/specialty.entity';

export interface ISpecialtiesRepository {
  FindByDescription(description: string): Promise<Specialty>;
}
