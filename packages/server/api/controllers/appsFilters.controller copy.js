/* eslint-disable no-promise-executor-return */
/* eslint-disable one-var */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */
const generateSlug = require('../lib/utils/generateSlug');
const capitalize = require('../lib/utils/capitalize');
const { normalizeUrl } = require('../lib/utils/normalizeUrl');
const { getAppleId } = require('../lib/utils/getAppleIdByUrl');
const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const OpenAI = require('openai');
const store = require('app-store-scraper');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env
});

const getOppositeOrderDirection = (direction) => {
  let lastItemDirection;
  if (direction === 'asc') {
    lastItemDirection = 'desc';
  } else if (direction === 'desc') {
    lastItemDirection = 'asc';
  }
  return lastItemDirection;
};

function toMySQLTimestamp(datetimeStr) {
  if (!datetimeStr) return null;
  const d = new Date(datetimeStr);
  return d.toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS"
}

// Helper: ensure the slug is unique by checking the DB
async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-await-in-loop
  while (await slugExists(slug)) {
    const suffix = `-${counter}`;
    const maxBaseLength = 200 - suffix.length;
    slug = `${baseSlug.slice(0, maxBaseLength)}${suffix}`;
    counter += 1;
  }

  return slug;
}

// Helper: check if a slug already exists in the database
async function slugExists(slug) {
  const existing = await knex('tags').where({ slug }).first();
  return !!existing;
}

// Helper: ensure the slug is unique by checking the DB
async function ensureUniqueSlugItems(baseSlug, table) {
  let slug = baseSlug;
  let counter = 1;

  // eslint-disable-next-line no-await-in-loop
  while (await slugExistsItems(slug, table)) {
    const suffix = `-${counter}`;
    const maxBaseLength = 200 - suffix.length;
    slug = `${baseSlug.slice(0, maxBaseLength)}${suffix}`;
    counter += 1;
  }

  return slug;
}

// Helper: check if a slug already exists in the database
async function slugExistsItems(slug, table) {
  const existing = await knex(table).where({ slug }).first();
  return !!existing;
}

async function createItems(prompt, table) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 3000,
  });

  const string = completion.choices[0].message.content.trim();

  const array = string
    .split(',')
    .map((tag) => (typeof tag === 'string' ? tag.trim() : null))
    .filter(Boolean);

  const itemsIds = await Promise.all(
    array.map(async (item) => {
      const existing = await knex(table)
        .whereRaw('LOWER(title) = ?', [item.toLowerCase()])
        .first();

      if (existing) {
        return existing.id;
      }

      const baseSlug = generateSlug(item);
      const uniqueSlug = await ensureUniqueSlugItems(baseSlug, table);

      const [itemId] = await knex(table).insert({
        title: item,
        slug: uniqueSlug,
      }); // just use the ID
      return itemId;
    }),
  );
  return itemsIds;
}

function safeJsonParse(text) {
  try {
    // Remove ```json or ``` and trailing ```
    const cleaned = text.replace(/```json\s*|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse JSON from OpenAI:', err, text);
    return null;
  }
}

async function useChatGptForData(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    });

    const rawText = completion.choices[0].message.content;
    const data = safeJsonParse(rawText) || {}; // ✅ parse safely

    return data;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {}; // fallback if API call fails
  }
}

// === Timeout wrapper ===
async function withTimeout(promise, ms = 15000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI request timeout')), ms),
    ),
  ]);
}

const getAppsAll = async () => {
  try {
    const apps = knex('apps')
      .select('apps.*', 'categories.title as categoryTitle')
      .join('categories', 'apps.category_id', '=', 'categories.id');
    return apps;
  } catch (error) {
    return error.message;
  }
};

const getApps = async (page, column, direction) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'categories.title as categoryTitle',
          'categories.slug as categorySlug',
        )
        .join('categories', 'apps.category_id', '=', 'categories.id');
    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsPagination = async (column, direction, page, size) => {
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'categories.title as categoryTitle',
          'categories.slug as categorySlug',
        )
        .join('categories', 'apps.category_id', '=', 'categories.id')
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();

    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsSearch = async (search, column, direction, page, size) => {
  try {
    const getModel = () =>
      knex('apps')
        .select('apps.*', 'categories.title as categoryTitle')
        .join('categories', 'apps.category_id', '=', 'categories.id')
        .orderBy(column, direction)
        .where('apps.title', 'like', `%${search}%`);
    const totalCount = await getModel()
      .count('apps.id', { as: 'rows' })
      .groupBy('apps.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();

    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsByCategories = async (categories) => {
  try {
    const apps = await knex('apps')
      .select('apps.*', 'categories.title as categoryTitle')
      .join('categories', 'apps.category_id', '=', 'categories.id')
      .whereIn('category_id', categories);

    return apps;
  } catch (error) {
    return error.message;
  }
};

const getAppsByCategory = async (category, page, column, direction) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('apps')
        .select('apps.*', 'categories.title as categoryTitle')
        .join('categories', 'apps.category_id', '=', 'categories.id')
        .where({
          'apps.category_id': category,
        });

    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getAppsByTag = async (page, column, direction, tag) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'categories.title as categoryTitle',
          'tags.id as tagId',
          'tags.slug as tagSlug',
          'tags.title as tagTitle',
        )
        .join('categories', 'apps.category_id', '=', 'categories.id')
        .join('tagsApps', 'tagsApps.app_id', '=', 'apps.id')
        .join('tags', 'tags.id', '=', 'tagsApps.tag_id')
        .where('tags.slug', '=', `${tag}`);
    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const pricingFiltersMap = {
  free: (qb) => qb.orWhere('apps.pricing_free', true),
  freemium: (qb) => qb.orWhere('apps.pricing_freemium', true),
  'ios-paid': (qb) => qb.orWhere('apps.pricing_ios_app_paid', true),
  'ios-free': (qb) => qb.orWhere('apps.pricing_ios_app_free', true),
  subscription: (qb) => qb.orWhere('apps.pricing_subscription', true),
  'one-time': (qb) => qb.orWhere('apps.pricing_one_time', true),
  trial: (qb) => qb.orWhere('apps.pricing_trial_available', true),
};

const platformsFiltersMap = {
  'browser-extension': (qb) => qb.orWhereNotNull('apps.url_chrome_extension'),
  ios: (qb) => qb.orWhereNotNull('apps.apple_id'),
  android: (qb) => qb.orWhereNotNull('apps.url_google_play_store'),
  windows: (qb) => qb.orWhereNotNull('apps.url_windows'),
  mac: (qb) => qb.orWhereNotNull('apps.url_mac'),
};

const socialMediaFiltersMap = {
  twitter: (qb) => qb.orWhereNotNull('apps.url_x'),
  discord: (qb) => qb.orWhereNotNull('apps.url_discord'),
};

const otherFiltersMap = {
  'open-source': (qb) => qb.orWhere('apps.is_open_source', true),
  ai: (qb) => qb.orWhere('apps.is_ai_powered', true),
};

const getAppsBy = async ({
  page,
  column,
  direction,
  categories,
  pricing,
  platforms,
  socials,
  other,
  search,
  tags,
  features,
  userTypes,
  businessModels,
  useCases,
  industries,
}) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('apps')
        .select(
          'apps.*',
          'categories.title as categoryTitle',
          'categories.slug as categorySlug',
        )
        .join('categories', 'apps.category_id', '=', 'categories.id')
        .modify((queryBuilder) => {
          if (categories !== undefined) {
            const categoriesArray = categories.split(',');
            queryBuilder.whereIn('categories.slug', categoriesArray);
          }
          if (pricing !== undefined) {
            const pricingArray = pricing.split(',');
            queryBuilder.where(function () {
              pricingArray.forEach((pricingItem) => {
                const filterFn = pricingFiltersMap[pricingItem];
                if (filterFn) filterFn(this);
              });
            });
          }

          if (platforms !== undefined) {
            const platformsArray = platforms.split(',');
            queryBuilder.where(function () {
              platformsArray.forEach((platform) => {
                const filterFn = platformsFiltersMap[platform];
                if (filterFn) filterFn(this);
              });
            });
          }

          if (socials !== undefined) {
            const socialsArray = socials.split(',');
            queryBuilder.where(function () {
              socialsArray.forEach((social) => {
                const filterFn = socialMediaFiltersMap[social];
                if (filterFn) filterFn(this);
              });
            });
          }

          if (other !== undefined) {
            const otherArray = other.split(',');
            queryBuilder.where(function () {
              otherArray.forEach((otherItem) => {
                const filterFn = otherFiltersMap[otherItem];
                if (filterFn) filterFn(this);
              });
            });
          }

          if (search !== undefined) {
            const searchArray = search.split(',');
            queryBuilder.where(function () {
              searchArray.forEach((term) => {
                this.orWhere('apps.title', 'like', `%${term}%`).orWhere(
                  'apps.description',
                  'like',
                  `%${term}%`,
                );
              });
            });
          }

          // if (tags !== undefined) {
          //   const tagsArray = tags.split(',');
          //   queryBuilder.whereIn('apps.id', function () {
          //     this.select('app_id')
          //       .from('tagsApps')
          //       .whereIn('tag_id', tagsArray);
          //   });
          // }
          if (tags !== undefined) {
            const tagsArray = tags.split(',');
            queryBuilder.whereIn('apps.id', function () {
              this.select('tagsApps.app_id')
                .from('tagsApps')
                .join('tags', 'tagsApps.tag_id', 'tags.id')
                .whereIn('tags.slug', tagsArray);
            });
          }

          if (features !== undefined) {
            const featuresArray = features.split(',');
            queryBuilder.whereIn('apps.id', function () {
              this.select('featuresApps.app_id')
                .from('featuresApps')
                .join('features', 'featuresApps.feature_id', 'features.id')
                .whereIn('features.slug', featuresArray);
            });
          }

          if (userTypes !== undefined) {
            const userTypesArray = userTypes.split(',');
            queryBuilder.whereIn('apps.id', function () {
              this.select('userTypesApps.app_id')
                .from('userTypesApps')
                .join('userTypes', 'userTypesApps.userType_id', 'userTypes.id')
                .whereIn('userTypes.slug', userTypesArray);
            });
          }

          if (businessModels !== undefined) {
            const businessModelsArray = businessModels.split(',');
            queryBuilder.whereIn('apps.id', function () {
              this.select('businessModelsApps.app_id')
                .from('businessModelsApps')
                .join(
                  'businessModels',
                  'businessModelsApps.businessModel_id',
                  'businessModels.id',
                )
                .whereIn('businessModels.slug', businessModelsArray);
            });
          }

          if (useCases !== undefined) {
            const useCasesArray = useCases.split(',');
            queryBuilder.whereIn('apps.id', function () {
              this.select('useCasesApps.app_id')
                .from('useCasesApps')
                .join('useCases', 'useCasesApps.useCase_id', 'useCases.id')
                .whereIn('useCases.slug', useCasesArray);
            });
          }

          if (industries !== undefined) {
            const industriesArray = industries.split(',');
            queryBuilder.whereIn('apps.id', function () {
              this.select('industriesApps.app_id')
                .from('industriesApps')
                .join(
                  'industries',
                  'industriesApps.industry_id',
                  'industries.id',
                )
                .whereIn('industries.slug', industriesArray);
            });
          }

          // if (features !== undefined) {
          //   const featuresArray = features.split(',');
          //   queryBuilder.whereIn('apps.id', function () {
          //     this.select('app_id')
          //       .from('featuresApps')
          //       .whereIn('feature_id', featuresArray);
          //   });
          // }
          // if (userTypes !== undefined) {
          //   const userTypesArray = userTypes.split(',');
          //   queryBuilder.whereIn('apps.id', function () {
          //     this.select('app_id')
          //       .from('userTypesApps')
          //       .whereIn('userType_id', userTypesArray);
          //   });
          // }
          // if (businessModels !== undefined) {
          //   const businessModelsArray = businessModels.split(',');
          //   queryBuilder.whereIn('apps.id', function () {
          //     this.select('app_id')
          //       .from('businessModelsApps')
          //       .whereIn('businessModel_id', businessModelsArray);
          //   });
          // }
          // if (useCases !== undefined) {
          //   const useCasesArray = useCases.split(',');
          //   queryBuilder.whereIn('apps.id', function () {
          //     this.select('app_id')
          //       .from('useCasesApps')
          //       .whereIn('useCase_id', useCasesArray);
          //   });
          // }
          // if (industries !== undefined) {
          //   const industriesArray = industries.split(',');
          //   queryBuilder.whereIn('apps.id', function () {
          //     this.select('app_id')
          //       .from('industriesApps')
          //       .whereIn('industry_id', industriesArray);
          //   });
          // }
        });
    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10);
    // .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

// Get apps by id
const getAppById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }
  try {
    const app = await knex('apps')
      .select(
        'apps.*',
        'categories.title as categoryTitle',
        'categories.slug as categorySlug',
      )
      .join('categories', 'apps.category_id', '=', 'categories.id')
      .where({ 'apps.slug': id });
    if (app.length === 0) {
      throw new HttpError(`incorrect entry with the id of ${id}`, 404);
    }
    return app;
  } catch (error) {
    return error.message;
  }
};

// post
// const createApps = async (token, body) => {
//   try {
//     const userUid = token.split(' ')[1];
//     const user = (await knex('users').where({ uid: userUid }))[0];
//     if (!user) {
//       throw new HttpError('User not found', 401);
//     }
//     await knex('apps').insert({
//       title: body.title,
//       description: body.description,
//       topic_id: body.topic_id,
//       user_id: user.id,
//     });
//     return {
//       successful: true,
//     };
//   } catch (error) {
//     return error.message;
//   }
// };

const createAppNode = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) throw new HttpError('User not found', 401);

    const normalizedUrl = body.url ? normalizeUrl(body.url) : null;

    const appleId = await getAppleId(body);

    // === Check for existing apps ===
    if (appleId) {
      const existingApp = await knex('apps')
        .whereRaw('LOWER(apple_id) = ?', [String(appleId).toLowerCase()])
        .first();
      if (existingApp)
        return {
          successful: true,
          existing: true,
          appId: existingApp.id,
          appTitle: body.title,
          appAppleId: existingApp.apple_id,
        };
    } else {
      const existingUrl = await knex('apps')
        .where({ url: normalizedUrl })
        .orWhere({ title: body.title })
        .first();
      if (existingUrl)
        return {
          successful: true,
          existing: true,
          appId: existingUrl.id,
          appTitle: body.title,
          url: normalizedUrl,
        };
    }

    // === Tags ===
    const promptTags = `Create 3-4 tags for this app: "${body.title}"${
      body.url ? ` with website ${body.url}` : ''
    }. Tag should be without hashtag, multiple words allowed, and not contain 'app'. Return tags separated by comma.`;
    const tagsString = (
      await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: promptTags }],
        temperature: 0.7,
        max_tokens: 3000,
      })
    ).choices[0].message.content.trim();

    const tagsArray = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (body.tag) tagsArray.push(body.tag);

    const tagIds = await Promise.all(
      tagsArray.map(async (tag) => {
        const existingTag = await knex('tags')
          .whereRaw('LOWER(title) = ?', [tag.toLowerCase()])
          .first();
        if (existingTag) return existingTag.id;
        const uniqueSlug = await ensureUniqueSlug(generateSlug(tag));
        const [tagId] = await knex('tags').insert({
          title: tag,
          slug: uniqueSlug,
        });
        return tagId;
      }),
    );

    // === Prepare app info ===
    let description,
      urlIcon,
      appUrl,
      appExtra = {};

    if (appleId) {
      const lookupData = await (
        await fetch(`https://itunes.apple.com/lookup?id=${appleId}`)
      ).json();
      const appInfo = lookupData.results[0];
      description = appInfo.description;
      urlIcon = appInfo.artworkUrl512;
      const normalizedUrlAppleId = appInfo.sellerUrl
        ? normalizeUrl(appInfo.sellerUrl)
        : null;

      const app = await store.app({ id: appleId });
      const {
        price,
        currency,
        developer,
        developerId,
        developerUrl,
        released,
        languages,
        free,
      } = app;

      appUrl = body.url ? normalizedUrl : normalizedUrlAppleId;
      appExtra = {
        apple_id: appleId,
        url_icon: urlIcon,
        price,
        currency,
        developer,
        developer_id: developerId,
        developer_url: developerUrl,
        released: toMySQLTimestamp(released),
        languages: JSON.stringify(languages),
        pricing_ios_app_free: free,
        pricing_ios_app_paid: !free,
      };
    } else {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Write a short, engaging description for app "${
              body.title
            }"${body.url ? ` with website ${body.url}` : ''}.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });
      description = completion.choices[0].message.content.trim();
      appUrl = normalizedUrl;
    }

    // === Pricing + Attributes ===

    const [pricingData, attributesData, faqData] = await Promise.all([
      useChatGptForData(
        `Given the app "${body.title}"${
          appUrl ? ` with website ${appUrl}` : ''
        }${
          description ? ` and description: \"${description}\"` : ''
        }, determine its pricing model.

Return JSON with keys:
{
  "pricing_freemium": true/false,
  "pricing_subscription": true/false,
  "pricing_one_time": true/false,
  "pricing_trial_available": true/false,
  "pricing_details": "short human-readable text about pricing, e.g. '$9/mo or $89/year'",
  "pricing_url": "official pricing page URL if available, otherwise null",
  "pricing_free": true/false
}

Respond ONLY with valid JSON.`,
      ),

      useChatGptForData(
        `Based on the app "${body.title}"${
          appUrl ? ` with website ${appUrl}` : ''
        }${
          description ? ` and description: \"${description}\"` : ''
        }, determine if:

Return JSON with keys:
{
  "is_ai_powered": true/false,
  "is_open_source": true/false,
  "url_chrome_extension": url for browser extension (if available),
  "url_google_play_store": url for android app (if available),
  "url_windows": url for windows app (if available),
  "url_mac": url for mac app (if available),
  "url_x": url for X/twitter account (if available),
  "url_discord": url for discord account (if available),
  "url_fb": url for Facebook account (if available),
  "url_linkedin": url for linkedin account (if available),
  "e-mail": e-mail (if available, can be support e-mail),
}

Respond ONLY with valid JSON.`,
      ),

      useChatGptForData(
        `Based on the app "${body.title}"${
          appUrl ? ` with website ${appUrl}` : ''
        }${
          description ? ` and description: \"${description}\"` : ''
        }, determine if:

- How to create an account in app "${body.title}".
- How to delete an account in app "${body.title}".
- How to contact support in app "${body.title}".
- How to cancel subscription for app "${body.title}".
- How to change profile picture in app "${body.title}".
- How to log in "${body.title}".
- How to log out "${body.title}".
- Is app "${body.title}" on Android?
- App "${body.title}" doesn't work? Any common bugs? How to solve them?
- Is app "${body.title}" safe to use? Is it legit or scammy?
- Can you make money with app "${body.title}"?
- Does it make sense to upgrade in app "${
          body.title
        }"? What are main features of premium version.
- Can you use app "${
          body.title
        }" for free? Any ways to credits/coins for free? Either via promos, invite codes, completing tasks, etc.
- How to use "${body.title}"? Longer description.


Return JSON with keys:
{
    "faq_create_account": answer,
    "faq_delete_account": answer,
    "faq_contact_support": answer,
    "faq_cancel_subscription": answer,
    "faq_change_profile_picture": answer,
    "faq_log_in": answer,
    "faq_log_out": answer,
    "faq_is_app_on_android": answer,
    "faq_app_doesnt_work_bugs": answer,
    "faq_is_safe_to_use": answer,
    "faq_how_to_make_money": answer,
    "faq_should_you_upgrade": answer,
    "faq_can_use_for_free": answer,
    "description_how_to_use": answer,

}

Respond ONLY with valid JSON.`,
      ),
    ]);

    const baseSlug = generateSlug(body.title);
    const uniqueSlug = await ensureUniqueSlugItems(baseSlug, 'apps');

    // === Insert app ===
    const [appId] = await knex('apps').insert({
      title: body.title,
      slug: uniqueSlug,
      category_id: body.category_id,
      url: appUrl,
      user_id: user.id,
      description,
      ...appExtra,
      ...pricingData,
      ...attributesData,
      ...faqData,
    });

    // === Prompt builder ===
    const buildPrompt = (type, title, url, descriptionParam) => {
      const examples = {
        features:
          'E.g. Task management, Real-time chat, Analytics dashboard, Export to CSV, API access',
        userTypes: 'E.g. Individuals, Teams, Students, Startups, Enterprises',
        businessModels: 'E.g. SaaS, Marketplace, Directory, Tool, Plugin, API',
        useCases:
          'E.g. Social media automation, Time tracking, Resume building, Text summarization',
        industries:
          'E.g. Healthcare, Legal, Real Estate, Content Creators, Developers',
      };

      let base = `for this app: \"${title}\"`;
      if (url) base += ` with website ${url}`;
      if (descriptionParam) base += ` and description: \"${descriptionParam}\"`;

      return `Create ${type} ${base}. ${examples[type]}. ${capitalize(
        type,
      )} should be without hashtag, can be multiple words. Maximum 5 ${type}. Return ${type} separated by comma.`;
    };

    // === Features, UserTypes, BusinessModels, UseCases, Industries ===
    const featuresIds = await createItems(
      buildPrompt('features', body.title, appUrl, description),
      'features',
    );
    const userTypesIds = await createItems(
      buildPrompt('userTypes', body.title, appUrl, description),
      'userTypes',
    );
    const businessModelsIds = await createItems(
      buildPrompt('businessModels', body.title, appUrl, description),
      'businessModels',
    );
    const useCasesIds = await createItems(
      buildPrompt('useCases', body.title, appUrl, description),
      'useCases',
    );
    const industriesIds = await createItems(
      buildPrompt('industries', body.title, appUrl, description),
      'industries',
    );

    // === Relations ===
    const insertRelations = async (table, key, ids) =>
      Promise.all(
        ids.map((id) => knex(table).insert({ app_id: appId, [key]: id })),
      );
    await insertRelations('tagsApps', 'tag_id', tagIds);
    await insertRelations('featuresApps', 'feature_id', featuresIds);
    await insertRelations('userTypesApps', 'userType_id', userTypesIds);
    await insertRelations(
      'businessModelsApps',
      'businessModel_id',
      businessModelsIds,
    );
    await insertRelations('useCasesApps', 'useCase_id', useCasesIds);
    await insertRelations('industriesApps', 'industry_id', industriesIds);

    return {
      successful: true,
      appId,
      appTitle: body.title,
      url: appUrl,
      appAppleId: appleId || null,
    };
  } catch (error) {
    return error.message;
  }
};

// edit
const editApp = async (token, updatedAppId, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }

    if (!updatedAppId) {
      throw new HttpError('updatedAppId should be a number', 400);
    }

    await knex('apps').where({ id: updatedAppId }).update({
      description: body.description,
    });

    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getApps,
  getAppsPagination,
  getAppsSearch,
  getAppsByCategories,
  getAppsBy,
  getAppsByCategory,
  getAppById,
  getAppsAll,
  // createApps,
  editApp,
  createAppNode,
  getAppsByTag,
};
