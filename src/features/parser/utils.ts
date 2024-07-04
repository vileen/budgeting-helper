// Friday/Saturday are api-specific days, so we need to convert them to the closest weekday
// not sure why that is - forex works on friday and does not on sunday, and yet there is data for sunday
export const getClosestDate = (date: string) => {
  const dateObj = new Date(date);

  // Friday
  if (dateObj.getDay() === 5) {
    dateObj.setDate(dateObj.getDate() - 1);
    // Saturday
  } else if (dateObj.getDay() === 6) {
    dateObj.setDate(dateObj.getDate() - 2);
  }

  return dateObj;
};

export const getFirstKey = (obj: Record<string, Record<string, string>>) => {
  const keys = Object.keys(obj);
  return keys[0];
};
