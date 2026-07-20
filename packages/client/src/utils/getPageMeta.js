import { capitalizeFirstWord } from './capitalizeFirstWord';

const formatTitles = (titles) => {
  if (titles.length <= 3) {
    return titles.join(', ');
  }
  return `${titles.slice(0, 3).join(', ')}...`;
};

const buildMetaFromFilters = (filterConfig) => {
  const allTitles = [];

  filterConfig.forEach(({ values, options }) => {
    if (!values || values.length === 0 || !options || options.length === 0)
      return;

    // detect whether options use `id` or `key`
    const matchField = options[0]?.id !== undefined ? 'id' : 'key';

    values.forEach((val) => {
      let match;

      if (matchField === 'id') {
        // const parsedVal = isNaN(val) ? val : parseInt(val, 10);
        match = options.find((item) => item.slug === String(val));
        if (match?.title) {
          allTitles.push(match.title);
        }
      } else {
        match = options.find((item) => String(item.key) === String(val));
        if (match?.label) {
          allTitles.push(match.label);
        }
      }
    });
  });

  return allTitles;
};

export const getPageMeta = ({ filterConfig }) => {
  const allTitles = buildMetaFromFilters(filterConfig);

  // Add all filtered search terms
  const searchFilter = filterConfig.find((f) => f.key === 'search');
  if (searchFilter && searchFilter.values.length > 0) {
    searchFilter.values.forEach((term) => {
      allTitles.push(capitalizeFirstWord(term));
    });
  }

  if (allTitles.length > 0) {
    const shortTitle = formatTitles(allTitles);
    const capitalizedShort = capitalizeFirstWord(shortTitle);
    const capitalizedLong = capitalizeFirstWord(allTitles.join(', '));

    return {
      pageMetaTitle: `${capitalizedLong} products - Catch Top Deals`,
      pageMetaDescription: `${capitalizedLong} products - deals, reviews, promos.`,
      pageHeaderTitle: `${capitalizedShort} products`,
    };
  }

  return {
    pageMetaTitle: 'Catch Top Deals - find best products',
    pageMetaDescription: 'Reviews, deals, promos.',
    pageHeaderTitle: 'Find best products',
  };
};
