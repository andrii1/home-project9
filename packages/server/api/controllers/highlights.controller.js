/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const getHighlights = async () => {
  try {
    const highlights = await knex('highlights');

    return highlights;
  } catch (error) {
    return error.message;
  }
};

const getHighlightsByError = async (error) => {
  try {
    const highlights = await knex('highlights')
      .select('highlights.*')
      .join(
        'highlightsErrors',
        'highlightsErrors.highlight_id',
        '=',
        'highlights.id',
      )
      .join('errors', 'highlightsErrors.error_id', '=', 'errors.id')
      .where({ error_id: error });
    return highlights;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getHighlights,
  getHighlightsByError,
};
