/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable prefer-template */
// const fetch = require("node-fetch");

require('dotenv').config();

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env
});

// Credentials (from .env)
const USER_UID_BLOG = process.env.USER_UID_BLOG_LOCAL;
const API_PATH_BLOG = process.env.API_PATH_BLOG_LOCAL;
// Credentials (from .env)
const USER_UID = process.env.USER_UID_MAH_PROD;
const API_PATH = process.env.API_PATH_MAH_PROD;

const seedList = [
  'how to use',
  'how to delete',
  'how to withdraw',
  'review',
  'tutorial',
  'application',
  'stop',
  'how to fix',
  'how to earn',
  'how to get free',
  'for free',
  'stock',
];

const queries = [{ title: 'mobile news' }];

// fetch helpers

function capitalizeFirstWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function fetchCategories() {
  try {
    const res = await fetch(`${API_PATH_BLOG}/categories`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return null;
  }
}

async function insertCategory(title) {
  const res = await fetch(`${API_PATH_BLOG}/categories`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID_BLOG}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function createCategoryWithChatGpt(
  blogTitle,
  blogContent,
  listOfCategories,
) {
  // Generate a short description using OpenAI
  const prompt = `Select a category for this blog: ${blogTitle} with content: "${blogContent}". Select only from list of existing categories: "${listOfCategories}". You can only select from existing categories. Return category title only.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 100,
  });

  const topic = completion.choices[0].message.content.trim();
  return topic;
}

async function insertQuery(queryObj) {
  const res = await fetch(`${API_PATH}/queries`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(queryObj),
  });
  return await res.json(); // assume it returns { id, title }
}

async function createBlogContent(queryParam) {
  // Generate a short description using OpenAI

  const prompt = `Create a blog, based on query ${queryParam}. Treat ${queryParam} as main keyword - it should be spread in the blog. At least 1300 words. Do not include published by [Your Name] or Published on [Date]. Do not include title, headline, h1, h2 of the blog, just content of the article. Output with markdown.`;
  // console.log(prompt);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 3000,
  });

  const reply = completion.choices[0].message.content.trim();
  return reply;
}

const createPost = async (postDataParam) => {
  try {
    const response = await fetch(`${API_PATH_BLOG}/blogs`, {
      method: 'POST',
      headers: {
        token: `token ${USER_UID_BLOG}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postDataParam),
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('Post created successfully:', data);
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

const createPostMain = async () => {
  // let queries;
  // if (allowedDaysWeek.includes(todayDay)) {
  //   queries = await fetchSerpApi('7');
  // }

  // if (allowedDaysDay.includes(todayDay)) {
  //   queries = await fetchSerpApi('1');
  // }

  console.log('queries', queries);
  const dedupedQueries = [];
  for (const query of queries) {
    try {
      dedupedQueries.push(query.title);

      // CREATE BLOG

      const blogTitle = capitalizeFirstWord(query.title);
      const blogContent = await createBlogContent(query.title);
      const listOfCategories = await fetchCategories();

      console.log('listOfCategories', listOfCategories);

      const createdCategory = await createCategoryWithChatGpt(
        blogTitle,
        blogContent,
        listOfCategories,
      );

      console.log('createdCategory', createdCategory);

      const newCategory = await insertCategory(createdCategory);
      const { categoryId } = newCategory;
      console.log(categoryId);

      const postData = {
        title: blogTitle,
        content: blogContent,
        status: 'published',
        user_id: '1',
        category_id: categoryId,
      };

      await createPost(postData);
    } catch (err) {
      console.error(`Error processing query "${query.title}":`, err);
    }
  }

  // const apps = await searchBlogs(dedupedQueries);
  // await insertBlogs(apps);
};

createPostMain().catch(console.error);
