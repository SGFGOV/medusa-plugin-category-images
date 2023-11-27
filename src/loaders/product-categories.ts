export default async function () {
  const adminCategoriesImports = (await import(
    '@medusajs/medusa/dist/api/routes/admin/product-categories/index'
  )) as any;

  const storeCategoriesImports = (await import(
      '@medusajs/medusa/dist/api/routes/store/product-categories/index'
  )) as any;

  adminCategoriesImports.defaultAdminCategoryRelations = [
    ...adminCategoriesImports.defaultAdminCategoryRelations,
    'images',
  ];

  storeCategoriesImports.defaultStoreCategoryRelations = [
    ...storeCategoriesImports.defaultStoreCategoryRelations,
    'images',
  ];

  storeCategoriesImports.allowedStoreCategoryRelations = [
    ...storeCategoriesImports.allowedStoreCategoryRelations,
    'images',
  ];
}
