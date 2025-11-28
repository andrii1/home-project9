/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const generateSlug = require('../lib/utils/generateSlug');
const getOppositeOrderDirection = require('../lib/utils/getOppositeOrderDirection');
// eslint-disable-next-line no-unused-vars
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
  const existing = await knex('errors').where({ slug }).first();
  return !!existing;
}

const getErrors = async () => {
  try {
    const errors = await knex('errors')
      .select(
        'errors.*',
        'users.email as userEmail',
        'users.full_name as userFullName',
      )
      .join('users', 'errors.user_id', '=', 'users.id');

    return errors;
  } catch (error) {
    return error.message;
  }
};

const getErrorsPagination = async (page, column, direction) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () => knex('errors');
    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getErrorById = async (slug) => {
  if (!slug) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const error = await knex('errors')
      .select('errors.*', 'users.full_name as userFullName')
      .join('users', 'errors.user_id', '=', 'users.id')
      .where('errors.slug', slug);
    if (error.length === 0) {
      throw new Error(`incorrect entry with the id of ${slug}`, 404);
    }
    return error;
  } catch (error) {
    return error.message;
  }
};

// const editError = async (exampleResourceId, updatedExampleResource) => {
//   if (!exampleResourceId) {
//     throw new HttpError('exampleResourceId should be a number', 400);
//   }

//   return knex('errors').where({ id: exampleResourceId }).update({
//     title: updatedExampleResource.title,
//     updatedAt: moment().format(),
//   });
// };

// const deleteExampleResource = async (exampleResourceId) => {
//   return knex('exampleResources').where({ id: exampleResourceId }).del();
// };

const createError = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    const baseSlug = generateSlug(body.title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);

    // Generate a short description using OpenAI
    const prompt = `Write a short, 200 characters maximum, error summary for error with title "${body.title}" and content "${body.content}". Do not include "**Error Summary:**" part.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    });

    const summary = completion.choices[0].message.content.trim();

    // const promptTags = `Create 3-4 tags for this error with title: "${body.title}" and content "${body.content}". Tag should be without hashtag, ideally one word, which describes the error, but can be from more words if needed in context. Return tags separated by comma.`;

    // const completionTags = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [{ role: 'user', content: promptTags }],
    //   temperature: 0.7,
    //   max_tokens: 600,
    // });

    // const tagsString = completionTags.choices[0].message.content.trim();

    // const tagsArray = tagsString.split(',').map((tag) => tag.trim());

    // if (body.tag) {
    //   tagsArray.push(body.tag);
    // }

    // const tagIds = await Promise.all(
    //   tagsArray.map(async (tag) => {
    //     const existingTag = await knex('tags')
    //       .whereRaw('LOWER(title) = ?', [tag.toLowerCase()])
    //       .first();

    //     if (existingTag) {
    //       return existingTag.id;
    //     }
    //     const baseSlugTag = generateSlug(tag);
    //     const uniqueSlugTag = await ensureUniqueSlug(baseSlugTag);
    //     const [tagId] = await knex('tags').insert({
    //       title: tag,
    //       slug: uniqueSlugTag,
    //     }); // just use the ID
    //     return tagId;
    //   }),
    // );

    const [errorId] = await knex('errors').insert({
      title: body.title,
      content: body.content,
      slug: uniqueSlug,
      summary,
      cover_image_url: body.cover_image_url,
      status: body.status,
      created_at: body.created_at,
      updated_at: body.updated_at,
      meta_description: body.meta_description,
      user_id: body.user_id,
    });

    // const insertedErrorToTags = await Promise.all(
    //   tagIds.map((tagId) =>
    //     knex('tagsErrors').insert({
    //       error_id: errorId,
    //       tag_id: tagId,
    //     }),
    //   ),
    // );

    return {
      successful: true,
      errorId,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getErrors,
  getErrorsPagination,
  getErrorById,
  // deleteExampleResource,
  createError,
  // editExampleResource,
};
