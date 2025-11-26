export const removeMarkdown = (text) => {
  if (!text) return ''; // return empty string if null/undefined
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // **bold**
    .replace(/__(.*?)__/g, '$1') // __bold__
    .replace(/\*(.*?)\*/g, '$1') // *italic*
    .replace(/_(.*?)_/g, '$1'); // _italic_
};
