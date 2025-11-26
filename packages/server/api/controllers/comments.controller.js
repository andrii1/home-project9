const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

// get all comments
const getAllComments = async () => {
  try {
    const allComments = await knex.select().table('comments');

    if (allComments.length === 0) {
      throw new HttpError(`No reviews`, 404);
    }
    return allComments;
  } catch (error) {
    if (error instanceof HttpError) {
      return error.message;
    }
  }
};

// get comment by app id
const getCommentsByErrorId = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const comments = await knex('comments')
      .join('users', 'comments.user_id', '=', 'users.id')
      .where('comments.error_id', '=', `${id}`);

    return comments;
  } catch (error) {
    return error.message;
  }
};

// post
const createComments = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    await knex('comments').insert({
      user_id: user.id,
      error_id: body.error_id,
      content: body.content,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

// delete

const deleteComments = async (token, commentId) => {
  const userUid = token.split(' ')[1];
  const user = (await knex('users').where({ uid: userUid }))[0];
  if (!user) {
    throw new HttpError('User not found', 401);
  }
  try {
    const deletedComment = await knex('comments')
      .where({ id: commentId, user_id: user.id })
      .del();
    if (deletedComment === 0) {
      throw new HttpError('The comments ID you provided does not exist.', 400);
    } else {
      return {
        successful: true,
      };
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllComments,
  getCommentsByErrorId,
  createComments,
  deleteComments,
};
