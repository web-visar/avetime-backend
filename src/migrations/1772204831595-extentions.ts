import { MigrationInterface, QueryRunner } from 'typeorm';

export class Extentions1772204831595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
