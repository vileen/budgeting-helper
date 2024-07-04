import { getClosestDate, getFirstKey } from '../utils';

describe('utils', () => {
  describe('#getClosestDate', () => {
    it('get friday, should return thursday', () => {
      const testDate = new Date('2024-05-24');
      const result = getClosestDate(testDate.toISOString());

      expect(result.getDate()).toBe(23);
    });
    it('get saturday, should return thursday', () => {
      const testDate = new Date('2024-05-25');
      const result = getClosestDate(testDate.toISOString());

      expect(result.getDate()).toBe(23);
    });
    it('get sunday, should return sunday', () => {
      const testDate = new Date('2024-05-26');
      const result = getClosestDate(testDate.toISOString());

      expect(result.getDate()).toBe(26);
    });
    it('get monday, should return monday', () => {
      const testDate = new Date('2024-05-27');
      const result = getClosestDate(testDate.toISOString());

      expect(result.getDate()).toBe(27);
    });
  });

  describe('#getFirstKey', () => {
    const obj = {
      '2024-06-27': {
        '1. open': '4.30780',
        '2. high': '4.31578',
        '3. low': '4.30120',
        '4. close': '4.30780',
      },
      '2024-06-30': {
        '1. open': '4.31190',
        '2. high': '4.32830',
        '3. low': '4.31062',
        '4. close': '4.31280',
      },
      '2024-07-01': {
        '1. open': '4.31202',
        '2. high': '4.32030',
        '3. low': '4.28960',
        '4. close': '4.29738',
      },
    };

    const result = getFirstKey(obj);

    expect(result).toBe('2024-06-27');
  });
});
