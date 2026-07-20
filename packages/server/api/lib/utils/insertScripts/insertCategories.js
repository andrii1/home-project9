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
  const existing = await knex('categories').where({ slug }).first();
  return !!existing;
}

// Insert categories with slugs
async function insertCategories() {
  try {
    console.log('Inserting categories with slugs...');

    for (const category of categories) {
      const baseSlug = generateSlug(category.title);
      const uniqueSlug = await ensureUniqueSlug(baseSlug);

      const completionMetaDescription = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Write a short, engaging meta description SEO for category "${category.title}". Maximum 150 characters.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });
      const metaDescription =
        completionMetaDescription.choices[0].message.content.trim();

      await knex('categories').insert({
        title: category.title,
        slug: uniqueSlug,
        meta_description: metaDescription,
      });
    }

    console.log('Done ✅');
  } catch (error) {
    console.error('Error inserting categories:', error);
  } finally {
    await knex.destroy();
  }
}

insertCategories();
