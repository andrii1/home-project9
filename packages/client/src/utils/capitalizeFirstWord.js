export const capitalizeFirstWordLowerRest = (str) => {
  const [first, ...rest] = str.split(' ');
  const capitalizedFirst =
    first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  const lowerRest = rest.join(' ').toLowerCase();
  return [capitalizedFirst, lowerRest].filter(Boolean).join(' ');
};

export const capitalizeFirstWord = (str) => {
  const [first, ...rest] = str.split(' ');
  const capitalizedFirst =
    first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  const restText = rest.join(' ');
  return [capitalizedFirst, restText].filter(Boolean).join(' ');
};
