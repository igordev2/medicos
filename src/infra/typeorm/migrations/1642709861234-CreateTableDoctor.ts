import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableDoctor1642709861234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(120)',
          },
          {
            name: 'crm',
            type: 'varchar',
            precision: 7,
          },
          {
            name: 'landline',
            type: 'bigint',
          },
          {
            name: 'cellphone',
            type: 'bigint',
          },
          {
            name: 'address_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],

        foreignKeys: [
          {
            name: 'FK_AddressDoctor',
            referencedTableName: 'addresses',
            referencedColumnNames: ['id'],
            columnNames: ['address_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
  }
}
