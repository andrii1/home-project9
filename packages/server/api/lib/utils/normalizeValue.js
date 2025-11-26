const normalizeValue = (item) => {
  const val = item;

  if (val === 'Breakout') {
    return 100; // special case
  }

  // if it's a percentage like "+350%"
  if (typeof val === 'string' && val.endsWith('%')) {
    // remove + and %, then convert to number
    const num = parseFloat(val.replace('+', '').replace('%', ''));
    return num / 100; // 350% -> 3.5
  }

  return null; // fallback if format is unexpected
};

module.exports = normalizeValue;
