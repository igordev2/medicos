import { Doctor } from '../entities/doctor.entity';

export interface IDoctorsRepository {
  FindByName(name: string): Promise<Doctor>;
}
