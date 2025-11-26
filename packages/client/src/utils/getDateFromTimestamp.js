export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp?.replace(' ', 'T'));

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};
