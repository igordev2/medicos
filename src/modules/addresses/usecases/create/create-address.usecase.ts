import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../../dtos/create-adress.dto';
import { Address } from '../../entities/address.entity';
import { AddressesRepository } from '../../repository/addresses.repository';

@Injectable()
export class CreateAddressUseCase {
  constructor(private readonly repository: AddressesRepository) {}

  async execute({
    zipCode,
    streetAddress,
    neighborhood,
    locality,
    uf,
  }: CreateAddressDto) {
    return await this.repository.Create(
      new Address({ zipCode, streetAddress, neighborhood, locality, uf }),
    );
  }
}
