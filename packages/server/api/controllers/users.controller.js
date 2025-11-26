const knex = require('../../config/db');

const checkIfUserExists = async (token) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    return { exists: !!user };
  } catch (error) {
    return error.message;
  }
};

// post
const createUsers = async (body) => {
  try {
    await knex('users').insert({
      full_name: body.full_name,
      email: body.email,
      uid: body.uid,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUsers,
  checkIfUserExists,
};
