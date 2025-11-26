// TODO: This is a sample seed file for demonstration. Remove before adding real ones.

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('exampleResources')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('exampleResources').insert([
        {
          id: 1,
          title: 'abc',
        },
        {
          id: 2,
          title: 'def',
        },
      ]);
    });
};
