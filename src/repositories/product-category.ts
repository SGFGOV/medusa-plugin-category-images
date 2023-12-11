import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductCategory } from "../models/product-category";
import { ProductCategoryRepository as MedusaProductCategoryRepository } from "@medusajs/medusa/dist/repositories/product-category";

export const ProductCategoryRepository = dataSource
    .getRepository(ProductCategory)
    .extend({
        ...MedusaProductCategoryRepository
    });

export default ProductCategoryRepository;
