import { MigrationInterface, QueryRunner } from 'typeorm';

export class productCategoryImages1688410506235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_category_images" ("category_id" character varying NOT NULL, "image_id" character varying NOT NULL, CONSTRAINT "PK_category_image" PRIMARY KEY ("category_id", "image_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_product_category_images_category_id" ON "product_category_images" ("category_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_product_category_images_image_id" ON "product_category_images" ("image_id") `
    );

    await queryRunner.query(
      `ALTER TABLE "product_category_images" ADD CONSTRAINT "FK_product_category_images_category_id" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category_images" ADD CONSTRAINT "FK_product_category_images_image_id" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_category_images" DROP CONSTRAINT "FK_product_category_images_category_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_category_images" DROP CONSTRAINT "FK_product_category_images_image_id"`
    );
    await queryRunner.query(`DROP TABLE "product_category_images"`);
  }
}
