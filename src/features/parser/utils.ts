// Friday/Saturday are api-specific days, so we need to convert them to the closest weekday
// not sure why that is - forex works on friday and does not on sunday, and yet there is data for sunday
import { formatDate } from 'date-fns';
import { DATE_FORMAT } from '../../common/constants';

export const getClosestDate = (
  date: string,
  exchangeRates: Record<string, Record<string, string>>,
) => {
  const dateObj = new Date(date);

  // Friday
  if (dateObj.getDay() === 5) {
    dateObj.setDate(dateObj.getDate() - 1);
    // Saturday
  } else if (dateObj.getDay() === 6) {
    dateObj.setDate(dateObj.getDate() - 2);
  }

  // occasionally api doesn't return data for sundays
  if (!exchangeRates[formatDate(dateObj, DATE_FORMAT)]) {
    dateObj.setDate(dateObj.getDate() - 3);
  }

  return dateObj;
};

// consider sorting in case api messes up
export const getFirstKey = (obj: Record<string, Record<string, string>>) => {
  const keys = Object.keys(obj);
  return keys[0];
};
