/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('SET foreign_key_checks = 0');
  await knex('users').del();
  await knex.raw('SET foreign_key_checks = 1');
  await knex('users').insert([
    {
      id: 1,
      first_name: 'Andrii',
      last_name: 'Gor',
      email: 'agorh@icloud.com',
    },
    {
      id: 2,
      first_name: 'Andrew',
      last_name: 'Goro',
      email: 'agorh+1@icloud.com',
    },
    { id: 3, first_name: 'Andrew', last_name: 'Gora', email: 'agorh@test.com' },
  ]);
};
