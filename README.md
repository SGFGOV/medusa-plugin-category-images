# Medusa-Plugin-Category-Images

Adding possibility to add images to the product categories.

# Getting started

Installation

```bash
yarn add medusa-plugin-category-images
```

# Usage

## Configuration

This plugin requires min version of packages:

```
"@medusajs/medusa": "^1.14.0",
"@medusajs/admin": "^7.0.0"
"medusa-react": "^9.0.4",
"@medusajs/ui": "^1.0.0",
"@medusajs/icons": "^1.0.0",
```

### Add to medusa-config.js

add to your plugins list

```
///...other plugins
  {
    resolve: 'medusa-plugin-category-images',
    options: {
      enableUI: true,
    },
  },

```

### Update database schema

Run the following command from the root of the project to udpate database with a new table required for storing product category

```
npx medusa migrations run
```

### How to get images from category

After enabling this plugin, each category will contains `images` and `thumbnail` fields.
