import { Address } from '../entities/address.entity';

export interface IAddressesRepository {
  FindByZipCode(zipCode: string): Promise<Address[]>;
}
