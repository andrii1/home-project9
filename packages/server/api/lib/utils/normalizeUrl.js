const normalizeUrl = (url) => {
  if (!url || typeof url !== 'string') return ''; // ✅ Early return for bad input
  try {
    const u = new URL(url.trim().toLowerCase());

    // Remove 'www.' from the hostname
    const hostname = u.hostname.replace(/^www\./, '');

    // Remove trailing slashes from the pathname
    const pathname = u.pathname.replace(/\/+$/, '');

    // Rebuild the normalized URL
    return `${u.protocol}//${hostname}${pathname}`;
  } catch (error) {
    // If URL constructor fails, fallback to a basic cleanup
    return url
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\/(www\.)?/, '')
      .replace(/\/+$/, '');
  }
};

module.exports = {
  normalizeUrl,
};
