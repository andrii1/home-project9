/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const generateSlug = require('../lib/utils/generateSlug');

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
  const existing = await knex('categories').where({ slug }).first();
  return !!existing;
}

const getCategories = async () => {
  try {
    const categories = await knex('categories').select('categories.*');

    return categories;
  } catch (error) {
    return error.message;
  }
};

const createCategory = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    // Optional: check for existing category
    const existing = await knex('categories')
      .whereRaw('LOWER(title) = ?', [body.title.toLowerCase()])
      .first();

    if (existing) {
      return {
        successful: true,
        existing: true,
        categoryId: existing.id,
        categoryTitle: body.title,
      };
    }

    const baseSlug = generateSlug(body.title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);

    const insertData = {
      title: body.title,
      slug: uniqueSlug,
    };

    const [categoryId] = await knex('categories').insert(insertData);

    return {
      successful: true,
      categoryId,
      categoryTitle: body.title,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getCategories,
  createCategory,
};
