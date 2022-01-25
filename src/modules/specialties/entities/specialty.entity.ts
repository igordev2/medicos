import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('specialties')
export class Specialty extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty()
  description: string;

  constructor(description: string) {
    super();
    this.description = description;
  }
}
