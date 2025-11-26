// Helper: generate a clean, 200-character slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove multiple hyphens
    .slice(0, 200); // limit to 200 chars
};

module.exports = generateSlug;
