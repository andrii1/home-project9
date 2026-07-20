/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.string('slug').notNullable();
    table.text('description').nullable();
    table.integer('category_id').unsigned();
    table.foreign('category_id').references('id').inTable('categories');
    table.text('url').nullable();
    table.text('url_x').nullable();
    table.text('url_discord').nullable();
    table.text('url_app_store').nullable();
    table.text('url_google_play_store').nullable();
    table.text('url_chrome_extension').nullable();
    table.text('url_image').nullable();
    table.string('meta_description').nullable();
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.unique(['slug']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
