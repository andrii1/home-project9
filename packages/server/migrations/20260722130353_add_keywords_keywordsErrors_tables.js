/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('keywords', (table) => {
      table.increments();
      table.string('slug').notNullable();
      table.string('title').notNullable();
      table.text('meta_description').nullable();
    })
    .createTable('keywordsErrors', (table) => {
      table.increments();
      table.integer('error_id').unsigned();
      table.foreign('error_id').references('id').inTable('errors');
      table.integer('keyword_id').unsigned();
      table.foreign('keyword_id').references('id').inTable('keywords');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('keywordsErrors').dropTable('keywords');
};
