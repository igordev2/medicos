import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
