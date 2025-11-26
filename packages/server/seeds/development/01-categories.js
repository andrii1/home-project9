/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('SET foreign_key_checks = 0');
  await knex('categories').del();
  await knex.raw('SET foreign_key_checks = 1');
  await knex('categories').insert([
    { id: 1, title: 'Notion' },
    { id: 2, title: 'Digital Products' },
    { id: 3, title: 'Affiliate Marketing' },
    { id: 4, title: 'Email Marketing' },
    { id: 5, title: 'Twitter' },
    { id: 6, title: 'YouTube' },
    { id: 7, title: 'Copywriting' },
  ]);
};
