import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/modules/addresses/entities/address.entity';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

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

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: Date;

  constructor(
    name: string,
    crm: number,
    landline: number,
    cellPhone: number,
    address: Address,
    specialties: Specialty[],
  ) {
    this.name = name;
    this.crm = crm;
    this.landline = landline;
    this.cellPhone = cellPhone;
    this.address = address;
    this.specialties = specialties;
  }
}
