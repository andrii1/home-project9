/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw('SET foreign_key_checks = 0');
  await knex('topics').del();
  await knex.raw('SET foreign_key_checks = 1');
  await knex('topics').insert([
    {
      id: '1',
      title: 'Selling Notion templates',
      category_id: '1',
    },
    {
      id: '2',
      title: 'Notion for digital products',
      category_id: '1',
    },
    {
      id: '3',
      title: 'Notion for managing your personal life',
      category_id: '1',
    },
    {
      id: '4',
      title: 'Notion for managing your professional life',
      category_id: '1',
    },
    {
      id: '5',
      title: 'Notion for managing your business',
      category_id: '1',
    },
    {
      id: '6',
      title: 'Notion for managing content creation',
      category_id: '1',
    },
    {
      id: '7',
      title: 'The basics of creating digital products',
      category_id: '2',
    },
    {
      id: '8',
      title: 'Designing a high quality product',
      category_id: '2',
    },
    {
      id: '9',
      title: 'Creating an offer page',
      category_id: '2',
    },
    {
      id: '10',
      title: 'Monetizing a digital product',
      category_id: '2',
    },
    {
      id: '11',
      title: 'Increasing user engagement',
      category_id: '2',
    },
    {
      id: '12',
      title: 'Optimize performance',
      category_id: '2',
    },
    {
      id: '13',
      title: 'Common mistakes and problem solving',
      category_id: '2',
    },
    {
      id: '14',
      title: 'Finding products and offers',
      category_id: '3',
    },
    {
      id: '15',
      title: 'Creating landing pages for affiliate offers',
      category_id: '3',
    },
    {
      id: '16',
      title: 'Digital Marketing for affiliate products',
      category_id: '3',
    },
    {
      id: '17',
      title: 'Building an email list for affiliate marketing',
      category_id: '3',
    },
    {
      id: '18',
      title: 'Creating a resource page on website/blog with affiliate links',
      category_id: '3',
    },
    {
      id: '19',
      title: 'Utilizing social media to showcase products with links in bio',
      category_id: '3',
    },
    {
      id: '20',
      title: 'Growing an email list',
      category_id: '4',
    },
    {
      id: '21',
      title: 'Email design and template creation',
      category_id: '4',
    },
    {
      id: '22',
      title: 'Laws & regulations',
      category_id: '4',
    },
    {
      id: '23',
      title: 'Automation & segmentation',
      category_id: '4',
    },
    {
      id: '24',
      title: 'Subject lines',
      category_id: '4',
    },
    {
      id: '25',
      title: 'Email deliverability and inbox placement',
      category_id: '4',
    },
    {
      id: '26',
      title: 'Optimization & A/B split testing',
      category_id: '4',
    },
    {
      id: '27',
      title: 'Thread ideas for sales',
      category_id: '5',
    },
    {
      id: '28',
      title: 'Tweet ideas',
      category_id: '5',
    },
    {
      id: '29',
      title: 'Improving tweets',
      category_id: '5',
    },
    {
      id: '30',
      title: 'Thread hooks',
      category_id: '5',
    },
    {
      id: '31',
      title: 'Twitter Growth',
      category_id: '5',
    },
    {
      id: '32',
      title: 'Monetization',
      category_id: '5',
    },
    {
      id: '33',
      title: 'Video ideas for CTAs',
      category_id: '6',
    },
    {
      id: '34',
      title: 'Video ideas',
      category_id: '6',
    },
    {
      id: '35',
      title: 'Video scripts',
      category_id: '6',
    },
    {
      id: '36',
      title: 'Thumbnail Design',
      category_id: '6',
    },
    {
      id: '37',
      title: 'Channel Growth',
      category_id: '6',
    },
    {
      id: '38',
      title: 'Keyword research & SEO',
      category_id: '6',
    },
    {
      id: '39',
      title: 'Video editing',
      category_id: '6',
    },
    {
      id: '40',
      title: 'Monetization',
      category_id: '6',
    },
    {
      id: '41',
      title: 'Digital product offers',
      category_id: '7',
    },
    {
      id: '42',
      title: 'Marketing Frameworks',
      category_id: '7',
    },
    {
      id: '43',
      title: 'Copywriting Frameworks',
      category_id: '7',
    },
    {
      id: '44',
      title: 'Cold DM',
      category_id: '7',
    },
    {
      id: '45',
      title: 'Cold Email',
      category_id: '7',
    },
    {
      id: '46',
      title: 'Writing Blogs',
      category_id: '7',
    },
    {
      id: '47',
      title: 'Influencer Marketing',
      category_id: '7',
    },
    {
      id: '48',
      title: 'Email Marketing',
      category_id: '7',
    },
    {
      id: '49',
      title: 'General copywriting',
      category_id: '7',
    },
    {
      id: '50',
      title: 'High ticket offers',
      category_id: '7',
    },
    {
      id: '51',
      title: 'Ghostwriting for creators & CEOs',
      category_id: '7',
    },
    {
      id: '52',
      title: 'Improve ChatGPT results',
      category_id: '7',
    },
  ]);
};
