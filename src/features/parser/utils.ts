// Friday/Saturday are api-specific days, so we need to convert them to the closest weekday
// not sure why that is - forex works on friday and does not on sunday, and yet there is data for sunday
import { formatDate } from 'date-fns';
import { DATE_FORMAT } from '../../common/constants';

const lookForClosestDate = (
  date: string,
  exchangeRates: Record<string, Record<string, string>>,
): Date => {
  const dateObj = new Date(date);

  if (exchangeRates[formatDate(dateObj, DATE_FORMAT)]) {
    return dateObj;
  } else {
    console.log(
      'no data for',
      formatDate(dateObj, DATE_FORMAT),
      'trying previous day',
    );
    return lookForClosestDate(
      formatDate(dateObj.setDate(dateObj.getDate() - 1), DATE_FORMAT),
      exchangeRates,
    );
  }
};

export const getClosestDate = (
  date: string,
  exchangeRates: Record<string, Record<string, string>>,
) => {
  return lookForClosestDate(date, exchangeRates);
};

// consider sorting in case api messes up
export const getFirstKey = (obj: Record<string, Record<string, string>>) => {
  const keys = Object.keys(obj);
  return keys[0];
};
