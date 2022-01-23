import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../../dtos/create-adress.dto';
import { Address } from '../../entities/address.entity';

@Injectable()
export class CreateAddressUseCase {
  constructor(
    @InjectRepository(Address) private readonly repository: Repository<Address>,
  ) {}

  async execute({
    zipCode,
    streetAddress,
    neighborhood,
    locality,
    uf,
  }: CreateAddressDto) {
    return this.repository.create(
      await this.repository.save(
        new Address({ zipCode, streetAddress, neighborhood, locality, uf }),
      ),
    );
  }
}
