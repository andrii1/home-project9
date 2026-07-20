/* eslint-disable prefer-arrow-callback */
exports.up = function (knex) {
  return knex.schema.alterTable('errors', function (table) {
    table.integer('product_id').unsigned();
    table.foreign('product_id').references('id').inTable('products');

    table.string('slug').notNullable().unique().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('errors', function (table) {
    table.dropForeign(['product_id']);
    table.dropColumn('product_id');

    table.dropUnique(['slug']);
    table.string('slug').nullable().alter();
  });
};
