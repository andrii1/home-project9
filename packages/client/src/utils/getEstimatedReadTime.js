export function getEstimatedReadTime(text = '', wordsPerMinute = 200) {
  const plainText = text.replace(/[#_*>\-\n]/g, ''); // strip Markdown
  const wordCount = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}
