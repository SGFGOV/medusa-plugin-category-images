import { Lifetime } from 'awilix';
import {
  ProductCategoryService as MedusaProductCategoryService,
  ProductCategory,
} from '@medusajs/medusa';
import { Logger } from '@medusajs/types';
import { UpdateProductCategoryInput as MedusaUpdateProductCategoryInput } from '@medusajs/medusa/dist/types/product-category';
import ImageRepository from '@medusajs/medusa/dist/repositories/image';

type UpdateProductCategoryInput = {
  images: string[];
} & MedusaUpdateProductCategoryInput;

class ProductCategoryService extends MedusaProductCategoryService {
  static LIFE_TIME = Lifetime.SCOPED;
  protected readonly imageRepository_: typeof ImageRepository;
  protected readonly logger_: Logger;

  constructor(container) {
    super(container);

    this.imageRepository_ = container.imageRepository;
    this.logger_ = container.logger;
  }

  // @ts-ignore
  async update(
      categoryId: string,
      update: UpdateProductCategoryInput
  ): Promise<ProductCategory> {
    if (update?.images) {
      const category = await this.retrieve(categoryId as string);
      const categoryRepo = this.activeManager_.withRepository(
          this.productCategoryRepo_
      );
      const imageRepo = this.manager_.withRepository(this.imageRepository_);
      category.images = await imageRepo.upsertImages(update.images);

      return await categoryRepo.save(category);
    }

    return super.update(categoryId, update);
  }
}

export default ProductCategoryService;
