/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const getUserTypes = async () => {
  try {
    const userTypes = await knex('userTypes');

    return userTypes;
  } catch (error) {
    return error.message;
  }
};

const getUserTypesByError = async (error) => {
  try {
    const userTypes = await knex('userTypes')
      .select('userTypes.*')
      .join(
        'userTypesErrors',
        'userTypesErrors.userType_id',
        '=',
        'userTypes.id',
      )
      .join('errors', 'userTypesErrors.error_id', '=', 'errors.id')
      .where({ error_id: error });
    return userTypes;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getUserTypes,
  getUserTypesByError,
};
