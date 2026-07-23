/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const fetch = require('node-fetch');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env
});

// Credentials (from .env)
const USER_UID = process.env.USER_UID_ERRORS_LOCAL;
const API_PATH = process.env.API_PATH_ERRORS_LOCAL;

// fetch helpers

const errorList = ['Netflix Error M7353-5101'];

async function fetchCategories() {
  try {
    const res = await fetch(`${API_PATH}/categories`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return null;
  }
}

async function createCategoryWithChatGpt(productTitle, listOfCategories) {
  // Generate a short description using OpenAI

  const prompt = `
Select the best category for this product.

Product: ${productTitle}

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

async function createProductWithChatGpt(errorTitle) {
  const prompt = `
Extract information about the product from this error.

Error: ${errorTitle}

Return ONLY valid JSON in this format:

{
  "title": "",
}

Rules:
- title: product/app/device/service name only.
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

async function insertCategory(title) {
  const res = await fetch(`${API_PATH}/categories`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function insertProduct(title, categoryId) {
  const res = await fetch(`${API_PATH}/products`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, category_id: categoryId }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function insertError(body) {
  const res = await fetch(`${API_PATH}/errors/node`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

const insertErrors = async (errorsParam) => {
  // console.log(appsParam);
  for (const errorTitle of errorsParam) {
    try {
      const createdProduct = await createProductWithChatGpt(errorTitle);

      const categories = await fetchCategories();

      const listOfCategoriesTitles = categories.map(
        (category) => category.title,
      );

      const createdCategory = await createCategoryWithChatGpt(
        createdProduct.title,
        listOfCategoriesTitles,
      );

      const { categoryId } = await insertCategory(createdCategory);
      const { productId } = await insertProduct(
        createdProduct.title,
        categoryId,
      );
      console.log('createdProduct', createdProduct);
      console.log('productId', productId);

      const body = {
        title: errorTitle,
        product_id: productId,
        status: 'published',
      };
      const newError = await insertError(body);

      console.log('Inserted error:', newError);
    } catch (err) {
      console.error(`❌ Failed to insert app ${errorTitle}:`, err.message);
      // continue with next app
    }
  }
};

insertErrors(errorList);

module.exports = insertErrors;
