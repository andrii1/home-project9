/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tagsErrors', (table) => {
    table.increments();
    table.integer('error_id').unsigned();
    table.foreign('error_id').references('id').inTable('errors');
    table.integer('tag_id').unsigned();
    table.foreign('tag_id').references('id').inTable('tags');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tagsErrors');
};
