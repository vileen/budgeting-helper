import { getClosestDate } from '../utils';

describe('utils', () => {
  it('get friday, should return friday', () => {
    const testDate = new Date('2024-05-24');
    const result = getClosestDate(testDate.toISOString());

    expect(result.getDate()).toBe(24);
  });
  it('get saturday, should return friday', () => {
    const testDate = new Date('2024-05-25');
    const result = getClosestDate(testDate.toISOString());

    expect(result.getDate()).toBe(24);
  });
  it('get sunday, should return friday', () => {
    const testDate = new Date('2024-05-26');
    const result = getClosestDate(testDate.toISOString());

    expect(result.getDate()).toBe(24);
  });
  it('get monday, should return monday', () => {
    const testDate = new Date('2024-05-27');
    const result = getClosestDate(testDate.toISOString());

    expect(result.getDate()).toBe(27);
  });
});
