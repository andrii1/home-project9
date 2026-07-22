/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const fetch = require('node-fetch');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env
});

// Credentials (from .env)
const USER_UID = process.env.USER_UID_DEALS_PROD;
const API_PATH = process.env.API_PATH_DEALS_PROD;

// fetch helpers

async function fetchAppByAppleId(appleId) {
  const url = `https://itunes.apple.com/lookup?id=${appleId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results[0];
}

async function createTopicWithChatGpt(category, app, appDescription) {
  // Generate a short description using OpenAI
  const prompt = `Generate a subcategory (or a topic) for this app: ${app}, which is in this Apple App Store category: ${category}, which has this app description: ${appDescription}. It should be 1 or 2 or 3 words maximum. Ideally 1 or 2 words.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 100,
  });

  const topic = completion.choices[0].message.content.trim();
  return topic;
}

async function insertCategory(title, categoryAppleId) {
  const res = await fetch(`${API_PATH}/categories`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, category_apple_id: categoryAppleId }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function insertTopic(title, categoryId) {
  const res = await fetch(`${API_PATH}/topics`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, category_id: categoryId }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function insertApp({ appTitle, appleId, appUrl, topicId }) {
  const body = {
    title: appTitle,
    topic_id: topicId,
  };

  if (appleId) {
    body.apple_id = appleId;
  }

  if (appUrl) {
    body.url = appUrl;
  }
  const res = await fetch(`${API_PATH}/apps/node`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function insertDeal(title, appleId, appId) {
  const res = await fetch(`${API_PATH}/deals/node`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      apple_id: appleId,
      app_id: appId,
    }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

const insertDeals = async (appsParam) => {
  // console.log(appsParam);
  for (const appItem of appsParam) {
    try {
      const appleId = appItem.id;

      const app = await fetchAppByAppleId(appleId);
      const category = app.primaryGenreName;
      const categoryAppleId = app.primaryGenreId;
      const appTitle = app.trackName;
      const appDescription = app.description;
      const appUrl = app.sellerUrl;

      const newCategory = await insertCategory(category, categoryAppleId);
      const { categoryId } = newCategory;
      console.log('Inserted category:', newCategory);

      const createdTopic = await createTopicWithChatGpt(
        category,
        appTitle,
        appDescription,
      );
      console.log('createdTopic', createdTopic);

      const newTopic = await insertTopic(createdTopic, categoryId);
      const { topicId } = newTopic;
      console.log('Inserted topic:', newTopic);

      const newApp = await insertApp({ appTitle, appleId, appUrl, topicId });
      const { appId } = newApp;
      const newAppTitle = newApp.appTitle;
      console.log('Inserted app:', newApp);

      // const deal = `${newAppTitle} referral codes`;

      const match = newAppTitle.match(/^(.*?)(?:-|:)/);
      const appName = match ? match[1].trim() : newAppTitle;
      const deal = `${appName} referral codes`;

      const newDeal = await insertDeal(deal, appleId, appId);
      // const { dealId } = newDeal;
      console.log('Inserted deal:', newDeal);
    } catch (err) {
      console.error(`❌ Failed to insert app ${appItem.id}:`, err.message);
      // continue with next app
    }
  }
};

module.exports = insertDeals;
