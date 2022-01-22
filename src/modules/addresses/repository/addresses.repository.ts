import { IBaseRepository } from 'src/modules/common/IBaseRepository';
import { EntityRepository, Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { IAddressesRepository } from './addresses.interface';

@EntityRepository(Address)
export class AddressesRepository
  extends Repository<Address>
  implements IBaseRepository<Address>, IAddressesRepository
{
  async Create(entity: Address): Promise<Address> {
    const entityCreate = await this.save(this.create(entity));

    return entityCreate;
  }

  async Update(entity: Address): Promise<Address> {
    const entityUpdate = this.merge(entity);
    await this.save(entityUpdate);

    return entityUpdate;
  }

  async Delete(id: string): Promise<void> {
    const entity = await this.Get(id);

    await this.softDelete(entity);
  }

  async Get(id: string): Promise<Address> {
    return await this.findOne(id);
  }

  async GetAll(): Promise<Address[]> {
    return await this.find();
  }

  async FindByZipCode(zipCode: string): Promise<Address[]> {
    return await this.find({ zipCode });
  }
}
