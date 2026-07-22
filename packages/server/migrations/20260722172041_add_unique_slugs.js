exports.up = function (knex) {
  return Promise.all([
    knex.schema.table('tags', (table) => {
      table.string('slug').notNullable().unique().alter();
    }),
    knex.schema.table('highlights', (table) => {
      table.string('slug').notNullable().unique().alter();
    }),
    knex.schema.table('userTypes', (table) => {
      table.string('slug').notNullable().unique().alter();
    }),
    knex.schema.table('keywords', (table) => {
      table.string('slug').notNullable().unique().alter();
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.table('tags', (table) => {
      table.string('slug').alter();
    }),
    knex.schema.table('highlights', (table) => {
      table.string('slug').alter();
    }),
    knex.schema.table('userTypes', (table) => {
      table.string('slug').alter();
    }),
    knex.schema.table('keywords', (table) => {
      table.string('slug').alter();
    }),
  ]);
};
