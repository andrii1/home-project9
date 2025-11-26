require('dotenv').config();

const USER_UID = process.env.USER_UID_BLOG_LOCAL;
const API_PATH = process.env.API_PATH_BLOG_LOCAL;

const categories = [
  'Inspiration & Motivation',
  'Productivity & Habits',
  'Wellness & Mental Health',
  'Lifestyle & Culture',
  'Relationships & Communication',
  'Career & Professional Growth',
  'Creativity & Writing',
  'Technology & Digital Life',
  'Education & Learning',
  'Travel & Adventure',
  'Health & Fitness',
  'Finance & Money',
  'Personal Development',
  'Philosophy & Life Lessons',
  'Entertainment & Media',
];

async function insertCategory(title) {
  const res = await fetch(`${API_PATH}/categories`, {
    method: 'POST',
    headers: {
      token: `token ${USER_UID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  return data; // assume it returns { id, full_name }
}

async function seedCategories() {
  for (const title of categories) {
    try {
      const result = await insertCategory(title);
      console.log('Inserted:', result);
    } catch (e) {
      console.error('Failed to insert:', title, e);
    }
  }
}

seedCategories();
