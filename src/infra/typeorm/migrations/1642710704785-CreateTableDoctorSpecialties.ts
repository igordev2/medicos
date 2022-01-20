import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableDoctorSpecialties1642710704785
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specialties_doctors',
        columns: [
          {
            name: 'doctor_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'specialty_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],

        foreignKeys: [
          {
            name: 'FK_DoctorSpecialty',
            referencedTableName: 'doctors',
            referencedColumnNames: ['id'],
            columnNames: ['doctor_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKSpecialtyDoctor',
            referencedTableName: 'specialties',
            referencedColumnNames: ['id'],
            columnNames: ['specialty_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('specialties_doctors');
  }
}
