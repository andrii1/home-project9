/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('blogs', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('content').notNullable();
    table.text('summary').nullable();
    table.string('slug').nullable();
    table.string('cover_image_url').nullable();
    table.text('meta_description').nullable();
    table
      .enum('status', ['published', 'draft'])
      .notNullable()
      .defaultTo('draft'); // Add enum column with default
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.integer('category_id').unsigned();
    table.foreign('category_id').references('id').inTable('categories');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('blogs');
};
