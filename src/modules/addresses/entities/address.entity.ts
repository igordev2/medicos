import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('addresses')
export class Address extends BaseEntity {
  @Column({ name: 'zip_code' })
  @ApiProperty()
  zipCode: string;

  @Column({ name: 'street_address' })
  @ApiProperty()
  streetAddress: string;

  @Column()
  @ApiProperty()
  neighborhood: string;

  @Column()
  @ApiProperty()
  locality: string;

  @Column()
  @ApiProperty()
  uf: string;

  constructor(address?: Partial<Address>) {
    super();
    this.zipCode = address?.zipCode;
    this.streetAddress = address?.streetAddress;
    this.neighborhood = address?.neighborhood;
    this.locality = address?.locality;
    this.uf = address?.uf;
  }
}
