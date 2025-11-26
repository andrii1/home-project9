/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tagsBlogs', (table) => {
    table.increments();
    table.integer('blog_id').unsigned();
    table.foreign('blog_id').references('id').inTable('blogs');
    table.integer('tag_id').unsigned();
    table.foreign('tag_id').references('id').inTable('tags');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tagsBlogs');
};
