/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('highlights', (table) => {
      table.increments();
      table.string('slug').notNullable();
      table.string('title').notNullable();
      table.text('meta_description').nullable();
    })
    .createTable('highlightsErrors', (table) => {
      table.increments();
      table.integer('error_id').unsigned();
      table.foreign('error_id').references('id').inTable('errors');
      table.integer('highlight_id').unsigned();
      table.foreign('highlight_id').references('id').inTable('highlights');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('highlightsErrors').dropTable('highlights');
};
