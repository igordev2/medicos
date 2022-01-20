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
  id: string;

  @Column({ length: 120, type: 'varchar' })
  name: string;

  @Column({ precision: 7, type: 'numeric' })
  crm: number;

  @Column({ type: 'numeric' })
  landline: number;

  @Column({ type: 'numeric' })
  cellPhone: number;

  @OneToOne(() => Address, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: string;

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'specialties_doctors',
    joinColumns: [{ name: 'doctor_id' }],
    inverseJoinColumns: [{ name: 'specialty_id' }],
  })
  specialties: [];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
