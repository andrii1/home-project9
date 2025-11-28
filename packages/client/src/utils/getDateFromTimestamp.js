export const getDateFromTimestamp = (timestamp, month = 'long') => {
  const date = new Date(timestamp?.replace(' ', 'T'));

  const options = { year: 'numeric', month, day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};
