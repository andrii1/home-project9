/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('queries', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.decimal('value');
    table.boolean('status').defaultTo('false');
    table.string('source');
    table.boolean('highlighted').defaultTo('false');
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('queries');
};
