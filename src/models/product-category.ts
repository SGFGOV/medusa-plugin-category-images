import { Column, Entity, Index, JoinTable, ManyToMany, Tree } from 'typeorm';
import {
  ProductCategory as MedusaProductCategory,
  Image,
} from '@medusajs/medusa';

@Entity()
@Tree("materialized-path")
@Index(["parent_category_id", "rank"], { unique: true })
export class ProductCategory extends MedusaProductCategory {
  @ManyToMany(() => Image, { cascade: ['insert'] })
  @JoinTable({
    name: 'product_category_images',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image_id',
      referencedColumnName: 'id',
    },
  })
  images: Image[];

  @Column({ type: 'text', nullable: true })
  thumbnail: string | null
}
