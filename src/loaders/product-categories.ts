/* eslint-disable require-jsdoc */

import { defaultAdminProductCategoryRelations } from "@medusajs/medusa/dist/api/routes/admin/product-categories";
import {
    defaultStoreProductCategoryRelations,
    allowedStoreProductCategoryFields
} from "@medusajs/medusa/dist/api/routes/store/product-categories";

export default async function (): Promise<void> {
    defaultAdminProductCategoryRelations.push("images");

    defaultStoreProductCategoryRelations.push("images");

    allowedStoreProductCategoryFields.push("images");
}
