/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('userTypes', (table) => {
      table.increments();
      table.string('slug').notNullable();
      table.string('title').notNullable();
      table.text('meta_description').nullable();
    })
    .createTable('userTypesErrors', (table) => {
      table.increments();
      table.integer('error_id').unsigned();
      table.foreign('error_id').references('id').inTable('errors');
      table.integer('userType_id').unsigned();
      table.foreign('userType_id').references('id').inTable('userTypes');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('userTypesErrors').dropTable('userTypes');
};
