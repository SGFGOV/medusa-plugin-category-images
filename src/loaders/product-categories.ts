/* eslint-disable require-jsdoc */

import { defaultAdminProductCategoryRelations } from "@medusajs/medusa/dist/api/routes/admin/product-categories/index";
import {
    defaultStoreProductCategoryRelations,
    allowedStoreProductCategoryFields
} from "@medusajs/medusa/dist/api/routes/store/product-categories/index";

export default async function (): Promise<void> {
    defaultAdminProductCategoryRelations.push("images");

    defaultStoreProductCategoryRelations.push("images");

    allowedStoreProductCategoryFields.push("images");
}
