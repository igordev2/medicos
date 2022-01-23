import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;

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

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: Date;

  constructor(address?: Partial<Address>) {
    this.zipCode = address?.zipCode;
    this.streetAddress = address?.streetAddress;
    this.neighborhood = address?.neighborhood;
    this.locality = address?.locality;
    this.uf = address?.uf;
  }
}
