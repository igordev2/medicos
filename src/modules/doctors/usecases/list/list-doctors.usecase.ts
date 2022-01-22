import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from '../../repository/doctors.repository';

@Injectable()
export class ListDoctorsUseCase {
  constructor(private readonly repository: DoctorsRepository) {}
  async execute() {
    return this.repository.GetAll();
  }
}
