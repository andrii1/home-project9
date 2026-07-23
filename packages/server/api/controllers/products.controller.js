/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */
require('dotenv').config();
const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const generateSlug = require('../lib/utils/generateSlug');
const { normalizeUrl } = require('../lib/utils/normalizeUrl');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env
});

// Helper: ensure the slug is unique by checking the DB
async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-await-in-loop
  while (await slugExists(slug)) {
    const suffix = `-${counter}`;
    const maxBaseLength = 200 - suffix.length;
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

async function createProductWithChatGpt(productTitle) {
  const prompt = `
Extract information about the product.

Product: ${productTitle}

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

const getProducts = async () => {
  try {
    const products = await knex('products')
      .select('products.*')
      .distinct('products.id')
      .join('errors', 'errors.product_id', '=', 'products.id')
      .orderBy('products.title');
    return products;
  } catch (error) {
    return error.message;
  }
};

const createProduct = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    // Optional: check for existing product
    const slug = generateSlug(body.title);
    const existing = await knex('products').where({ slug }).first();

    if (existing) {
      return {
        successful: true,
        existing: true,
        productId: existing.id,
        productTitle: body.title,
      };
    }

    const product = await createProductWithChatGpt(body.title);

    const normalizedUrl = product.url ? normalizeUrl(product.url) : null;

    const insertData = {
      title: body.title,
      slug,
      description: product.description,
      category_id: body.category_id,
      url: normalizedUrl,
      url_x: product.urlX,
      url_discord: product.urlDiscord,
      url_app_store: product.urlAppStore,
      url_google_play_store: product.urlGooglePlayStore,
      url_chrome_extension: product.urlChromeExtension,
      url_image: product.urlImage,
      meta_description: product.metaDescription,
    };

    const [productId] = await knex('products').insert(insertData);

    return {
      successful: true,
      productId,
      productTitle: body.title,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getProducts,
  createProduct,
};
