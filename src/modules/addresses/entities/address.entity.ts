import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column()
  neighborhood: string;

  @Column()
  locality: string;

  @Column()
  uf: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  constructor(
    zipCode: string,
    streetAddress: string,
    neighborhood: string,
    locality: string,
    uf: string,
  ) {
    this.zipCode = zipCode;
    this.streetAddress = streetAddress;
    this.neighborhood = neighborhood;
    this.locality = locality;
    this.uf = uf;
  }
}
