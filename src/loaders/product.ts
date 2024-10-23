export default async function () {
  const adminProductImports = (await import(
    '@medusajs/medusa/dist/api/routes/admin/products'
  )) as any;

  const storeProductImports = (await import(
    '@medusajs/medusa/dist/api/routes/store/products'
  )) as any;

  adminProductImports.defaultAdminProductRelations = [
    ...adminProductImports.defaultAdminProductRelations,
    'categories.images',
  ];

  storeProductImports.defaultStoreProductsRelations = [
    ...storeProductImports.defaultStoreProductsRelations,
    'categories.images',
  ]

  storeProductImports.allowedStoreProductsRelations = [
    ...storeProductImports.allowedStoreProductsRelations,
    'categories.images',
  ]
}
