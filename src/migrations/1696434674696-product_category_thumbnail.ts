import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductCategoryThumbnail1696434674696 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "product_category"' + ' ADD COLUMN "thumbnail" text'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "product_category" DROP COLUMN "thumbnail"'
        );
    }
}
