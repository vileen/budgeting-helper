export const getClosestDate = (date: string) => {
  const dateObj = new Date(date);

  // Sunday
  if (dateObj.getDay() === 0) {
    dateObj.setDate(dateObj.getDate() - 2);
    // Saturday
  } else if (dateObj.getDay() === 6) {
    dateObj.setDate(dateObj.getDate() - 1);
  }

  return dateObj;
};
