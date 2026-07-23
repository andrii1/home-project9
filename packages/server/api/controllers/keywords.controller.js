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
  const existing = await knex('keywords').where({ slug }).first();
  return !!existing;
}

/* Get all topics */
const getKeywords = async () => {
  try {
    const keywords = await knex('keywords');
    return keywords;
  } catch (error) {
    return error.message;
  }
};

const getKeywordById = async (slug) => {
  if (!slug) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const keywords = await knex('keywords').where({ slug });
    if (keywords.length === 0) {
      throw new Error(`incorrect entry of ${slug}`, 404);
    }
    return keywords;
  } catch (error) {
    return error.message;
  }
};

// Get topics by Category
const getKeywordsByError = async (error) => {
  try {
    const keywords = await knex('keywords')
      .select('keywords.*')
      .join('keywordsErrors', 'keywordsErrors.keyword_id', '=', 'keywords.id')
      .join('errors', 'keywordsErrors.error_id', '=', 'errors.id')
      .where({ error_id: error });
    return keywords;
  } catch (error) {
    return error.message;
  }
};

const createKeyword = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    const slug = await generateSlug(body.title);

    // Optional: check for existing keyword
    const existing = await knex('keywords').where({ slug }).first();

    if (existing) {
      return {
        successful: true,
        existing: true,
        keywordId: existing.id,
      };
    }

    const [keywordId] = await knex('keywords').insert({
      title: body.title.toLowerCase(),
      slug,
    });

    return {
      successful: true,
      keywordId,
      keywordTitle: body.title,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getKeywords,
  getKeywordById,
  getKeywordsByError,
  createKeyword,
};
