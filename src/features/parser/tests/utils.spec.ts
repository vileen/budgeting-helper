import { getClosestDate, getFirstKey } from '../utils';

const mockExchangeRates = {
  '2024-05-30': {
    '1. open': '4.27420',
    '2. high': '4.29476',
    '3. low': '4.27310',
    '4. close': '4.27630',
  },
  '2024-05-29': {
    '1. open': '4.24991',
    '2. high': '4.28070',
    '3. low': '4.24640',
    '4. close': '4.27660',
  },
  '2024-05-28': {
    '1. open': '4.25620',
    '2. high': '4.26173',
    '3. low': '4.24510',
    '4. close': '4.25270',
  },
  '2024-05-27': {
    '1. open': '4.24980',
    '2. high': '4.26132',
    '3. low': '4.24865',
    '4. close': '4.25290',
  },
  '2024-05-24': {
    '1. open': '4.26120',
    '2. high': '4.26485',
    '3. low': '4.24210',
    '4. close': '4.24370',
  },
  '2024-05-23': {
    '1. open': '4.26689',
    '2. high': '4.27206',
    '3. low': '4.25760',
    '4. close': '4.26120',
  },
};

describe('utils', () => {
  describe('#getClosestDate', () => {
    it('get friday, should return thursday', () => {
      const testDate = new Date('2024-05-24');
      const result = getClosestDate(testDate.toISOString(), mockExchangeRates);

      expect(result.getDate()).toBe(23);
    });
    it('get saturday, should return thursday', () => {
      const testDate = new Date('2024-05-25');
      const result = getClosestDate(testDate.toISOString(), mockExchangeRates);

      expect(result.getDate()).toBe(23);
    });
    it('get sunday, should return sunday', () => {
      const testDate = new Date('2024-05-26');
      const result = getClosestDate(testDate.toISOString(), mockExchangeRates);

      expect(result.getDate()).toBe(26);
    });
    it('get monday, should return monday', () => {
      const testDate = new Date('2024-05-27');
      const result = getClosestDate(testDate.toISOString(), mockExchangeRates);

      expect(result.getDate()).toBe(27);
    });
  });

  describe('#getFirstKey', () => {
    const result = getFirstKey(mockExchangeRates);

    expect(result).toBe('2024-05-30');
  });
});
