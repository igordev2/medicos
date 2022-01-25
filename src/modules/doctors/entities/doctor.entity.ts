import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../addresses/entities/address.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/BaseEntity';

@Entity({ name: 'doctors' })
export class Doctor extends BaseEntity {
  @Column({ length: 120, type: 'varchar' })
  @ApiProperty()
  name: string;

  @Column({ precision: 7, type: 'numeric' })
  @ApiProperty()
  crm: number;

  @Column({ type: 'numeric' })
  @ApiProperty()
  landline: number;

  @Column({ type: 'numeric', name: 'cellphone' })
  @ApiProperty()
  cellPhone: number;

  @OneToOne(() => Address, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  @ApiProperty()
  address: Address;

  @ManyToMany(() => Specialty, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'specialties_doctors',
    joinColumns: [{ name: 'doctor_id' }],
    inverseJoinColumns: [{ name: 'specialty_id' }],
  })
  @ApiProperty()
  specialties: Specialty[];

  constructor(doctor?: Partial<Doctor>) {
    super();
    this.name = doctor?.name;
    this.crm = doctor?.crm;
    this.landline = doctor?.landline;
    this.cellPhone = doctor?.cellPhone;
    this.address = doctor?.address;
    this.specialties = doctor?.specialties;
  }
}
