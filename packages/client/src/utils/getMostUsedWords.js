export const getMostUsedWords = (text, topN = 10) => {
  const stopWords = new Set([
    'the',
    'is',
    'and',
    'a',
    'of',
    'to',
    'in',
    'that',
    'it',
    'on',
    'for',
    'as',
    'with',
    'was',
    'at',
    'by',
    'app',
    'you',
    'your',
    'or',
    'from',
    'want',
    'an',
    'up',
    'get',
    'our',
    'we',
    'this',
    'can',
    'if',
    'one',
    'more',
    'will',
    'have',
    'has',
    'what',
    'where',
    '1',
    '2',
    '3',
    '4',
    '5',
    'be',
    'no',
    'off',
    'are',
    'come',
    'out',
    'reviews',
    'support',
    'available',
    'account',
    'into',
    'any',
    'help',
    'via',
    'like',
    'than',
    'whether',
    'helps',
    'through',
    'than',
  ]);

  const words = text
    ?.toLowerCase()
    .replace(/[^\w\s]/g, '') // remove punctuation
    .split(/\s+/) // split into words
    .filter((word) => word && !stopWords.has(word));

  const wordCount = {};
  for (const word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }

  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1]) // sort by frequency
    .slice(0, topN); // return top N
};
