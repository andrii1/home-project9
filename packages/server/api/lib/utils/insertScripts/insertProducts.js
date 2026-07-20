/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
require('dotenv').config();
const knex = require('../../../../config/db');
const generateSlug = require('../generateSlug');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env
});

const categories = [
  { title: 'Apps' },
  { title: 'Devices' },
  { title: 'Software' },
  { title: 'Operating Systems' },
  { title: 'Web Services' },
  { title: 'Games' },
  { title: 'Smart Home' },
  { title: 'Vehicles' },
  { title: 'Hardware' },
  { title: 'Business Tools' },
  { title: 'Developer Tools' },
  { title: 'Security' },
  { title: 'Other' },
];

const listOfCategoriesTitles = categories.map((category) => category.title);

async function createCategoryWithChatGpt(
  productTitle,
  productDescription,
  listOfCategories,
) {
  // Generate a short description using OpenAI

  const prompt = `
Select the best category for this product.

Product: ${productTitle}
Description: ${productDescription}

Return ONLY ONE category from this list:
${listOfCategories.join(', ')}

Return ONLY the category name. Nothing else.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 100,
  });

  const data = completion.choices[0].message.content.trim();
  return data;
}

async function insertCategory(category) {
  const categorySlug = generateSlug(category);
  const existingCategory = await knex('categories')
    .where({ slug: categorySlug })
    .first();

  if (existingCategory) {
    return { categoryId: existingCategory.id };
  }

  const [categoryId] = await knex('categories').insert({
    title: category.title,
    slug: categorySlug,
  });

  return { categoryId };
}

// async function createProductWithChatGpt(errorTitle, errorContent) {
//   // Generate a short description using OpenAI
//   const prompt = `
// Create a product for this error.

// Error: ${errorTitle}
// Description: ${errorContent}

// Return ONLY the product name. Nothing else.
// `;

//   const completion = await openai.chat.completions.create({
//     model: 'gpt-4o-mini',
//     messages: [{ role: 'user', content: prompt }],
//     temperature: 0.7,
//     max_tokens: 500,
//   });

//   const data = completion.choices[0].message.content.trim();
//   return data;
// }

async function createProductWithChatGpt(errorTitle, errorContent) {
  const prompt = `
Extract information about the product from this error.

Error: ${errorTitle}
Description: ${errorContent}

Return ONLY valid JSON in this format:

{
  "title": "",
  "description": "",
  "metaDescription": "",
  "url": "",
  "urlX": "",
  "urlDiscord": "",
  "urlAppStore": "",
  "urlGooglePlayStore": "",
  "urlChromeExtension": "",
  "urlImage": ""
}

Rules:
- title: product/app/device/service name only.
- description: 1-2 sentence description of the product.
- metaDescription: max 160 characters.
- Use the official website for url.
- Use the official X/Twitter profile if one exists.
- Use the official Discord invite if one exists.
- Use the official App Store URL if available.
- Use the official Google Play URL if available.
- Use the official Chrome Web Store URL if available.
- Use the official logo or product image URL if known.
- If a value is unknown or doesn't exist, return null.
- Return ONLY JSON.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0,
  });

  return JSON.parse(completion.choices[0].message.content);
}

async function insertProduct(product, categoryId) {
  const slug = generateSlug(product.title);

  const existing = await knex('products').where({ slug }).first();

  if (existing) {
    return existing.id;
  }

  const [productId] = await knex('products').insert({
    title: product.title,
    slug,
    description: product.description,
    category_id: categoryId,
    url: product.url,
    url_x: product.urlX,
    url_discord: product.urlDiscord,
    url_app_store: product.urlAppStore,
    url_google_play_store: product.urlGooglePlayStore,
    url_chrome_extension: product.urlChromeExtension,
    url_image: product.urlImage,
    meta_description: product.metaDescription,
  });

  return productId;
}

// Helper: ensure the slug is unique by checking the DB
async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-await-in-loop
  while (await slugExists(slug)) {
    const suffix = `-${counter}`;
    const maxBaseLength = 200 - suffix.length; // adjust max length if needed
    slug = `${baseSlug.slice(0, maxBaseLength)}${suffix}`;
    counter += 1;
  }

  return slug;
}

// Helper: check if a slug already exists in the database
async function slugExists(slug) {
  const existing = await knex('products').where({ slug }).first();
  return !!existing;
}

// Insert categories with slugs
async function insertProducts() {
  try {
    console.log('Inserting categories with slugs...');

    const errors = await knex('errors');

    for (const error of errors) {
      const createdProduct = await createProductWithChatGpt(
        error.title,
        error.content,
      );

      const createdCategory = await createCategoryWithChatGpt(
        createdProduct.title,
        createdProduct.description,
        listOfCategoriesTitles,
      );

      const { categoryId } = await insertCategory(createdCategory);
      const productId = await insertProduct(createdProduct, categoryId);

      await knex('errors').where({ id: error.id }).update({
        product_id: productId,
      });

      console.log({
        errorId: error.id,
        categoryId,
        productId,
      });
    }

    console.log('Done ✅');
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    await knex.destroy();
  }
}

insertProducts();
