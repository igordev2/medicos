import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../../entities/doctor.entity';

@Injectable()
export class ListDoctorsUseCase {
  constructor(
    @InjectRepository(Doctor) private readonly repository: Repository<Doctor>,
  ) {}
  async execute() {
    return this.repository.find();
  }
}
