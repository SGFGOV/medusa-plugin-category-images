/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { AdminPostProductCategoriesCategoryReq as MedusaAdminPostProductCategoriesCategoryReq } from "@medusajs/medusa";
import { IsOptional, IsArray, IsString } from "class-validator";

export class AdminPostProductsProductCategoriesCategoryReq extends MedusaAdminPostProductCategoriesCategoryReq {
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsString()
    @IsOptional()
    thumbnail?: string;
}
