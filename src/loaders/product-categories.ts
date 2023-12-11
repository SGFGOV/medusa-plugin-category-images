export default async function () {
  const adminImports = (await import(
    "@medusajs/medusa/dist/api/routes/admin/product-categories/index"
  )) as any;

  const storeImports = (await import(
    "@medusajs/medusa/dist/api/routes/store/product-categories/index"
  )) as any;

  adminImports.defaultAdminProductCategoryRelations = [
    ...(adminImports.defaultAdminProductCategoryRelations ?? []),
    "images",
  ];

  adminImports.defaultAdminProductCategoryFields = [
    ...(adminImports.defaultAdminProductCategoryFields ?? []),
    "images",
    "thumbnail",
  ];

  storeImports.defaultStoreProductCategoryRelations = [
    ...(storeImports.defaultStoreProductCategoryRelations ?? []),
    "images",
  ];

  storeImports.defaultStoreProductCategoryFields = [
    ...(storeImports.defaultStoreProductCategoryFields ?? []),
    "images",
    "thumbnail",
  ];
}
