import { IExchangeRatesApiClient, IModel, IUploadResponse } from './types';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { formatDate, isDate, isWithinInterval } from 'date-fns';
import { getClosestDate } from './utils';
import { DATE_FORMAT } from '../../common/constants';

const getSavedDatesRange = () => {
  const datesRange = JSON.parse(localStorage.getItem('datesRange')!);
  if (!datesRange || !datesRange[0] || !datesRange[1]) return [];

  return [new Date(datesRange[0]), new Date(datesRange[1])] || [];
};

// TODO move local storage handling to a separate service
// TODO expected value with additional tx to match it?
export class Model implements IModel {
  exchangeRatesApiClient: IExchangeRatesApiClient;
  datesRange: (Date | null)[] = getSavedDatesRange();
  originalData: Record<string, string>[] =
    JSON.parse(localStorage.getItem('originalData')!) || [];
  columns: string[] = JSON.parse(localStorage.getItem('columns')!) || [];
  columnsToHide: string[] =
    JSON.parse(localStorage.getItem('columnsToHide')!) || [];
  exchangeRates: Record<string, Record<string, string>> =
    JSON.parse(localStorage.getItem('exchangeRates')!) || {};
  errors: string[] = [];
  dateFieldName: string | null = localStorage.getItem('dateFieldName') || null;
  amountFieldName: string | null =
    localStorage.getItem('amountFieldName') || null;

  constructor(exchangeRatesApiClient: IExchangeRatesApiClient) {
    this.exchangeRatesApiClient = exchangeRatesApiClient;

    makeObservable(this, {
      datesRange: observable,
      originalData: observable.ref,
      uniqueDates: computed,
      filteredData: computed,
      columns: observable,
      dateFieldName: observable,
      amountFieldName: observable,
      columnsToHide: observable,
      exchangeRates: observable,
      uploadFile: action.bound,
      downloadExchangeRates: action.bound,
      setDatesRange: action.bound,
      setFieldNameValue: action.bound,
      setColumnsToHide: action.bound,
      updateFieldValue: action.bound,
    });
  }

  get filteredColumns() {
    return this.columns.filter(column => !this.columnsToHide.includes(column));
  }

  get filteredData() {
    if (
      !this.datesRange?.length ||
      this.datesRange?.[0] === null ||
      this.datesRange?.[1] === null
    )
      return [];

    return this.originalData
      .filter(row => {
        const dateValue = this.dateFieldName && row[this.dateFieldName];
        const formattedDate = dateValue
          ? new Date(formatDate(dateValue, 'yyyy-MM-dd'))
          : null;

        return (
          formattedDate &&
          isWithinInterval(formattedDate, {
            start: this.datesRange[0] as Date,
            end: this.datesRange[1] as Date,
          })
        );
      })
      .map(row => {
        const closestDate = getClosestDate(row[this.dateFieldName!]);
        const exchangeRate =
          this.exchangeRates[formatDate(closestDate, DATE_FORMAT)]['4. close'];
        const afterConversion = exchangeRate
          ? parseFloat(row[this.amountFieldName!]) * parseFloat(exchangeRate)
          : null;

        return {
          ...row,
          'Exchange rate': exchangeRate,
          'After conversion': afterConversion?.toFixed(2).toString() || '',
        };
      });
  }

  // shortcut, this should include templates, mapping columns etc.
  // or actually edit original table?
  get outputData() {
    return this.filteredData.reduce<Record<string, string>[]>((aggr, row) => {
      const newRow = {
        // @ts-ignore
        Date: formatDate(row[this.dateFieldName!], DATE_FORMAT),
        // @ts-ignore
        Payee: row['Payee'],
        // @ts-ignore
        Memo: row['Transaction Description'],
        // @ts-ignore
        Amount: row['After conversion'],
      };
      aggr.push(newRow);

      return aggr;
    }, []);
  }

  get uniqueDates() {
    return this.filteredData.reduce<string[]>((aggr, row) => {
      const dateValue = Object.entries(row).find(([_, value]) => {
        return isDate(new Date(value[1]));
      });

      const hasDateValue = dateValue && dateValue[1];
      const formattedDate = hasDateValue
        ? formatDate(dateValue[1], DATE_FORMAT)
        : null;

      if (formattedDate && aggr.indexOf(formattedDate) === -1) {
        aggr.push(formattedDate);
      }
      return aggr;
    }, []);
  }

  uploadFile(response: IUploadResponse) {
    const { data, errors } = response;
    this.setColumns(data);
    this.setData(data);
    this.setErrors(errors);
  }

  setColumns(originalData: string[][]) {
    this.columns = originalData[0];
    this.columns.push(...['Payee', 'Exchange rate', 'After conversion']);

    localStorage.setItem('columns', JSON.stringify(this.columns));
  }

  setErrors(errors: string[]) {
    this.errors = errors;
  }

  setDatesRange(dates?: (Date | null)[] | null) {
    if (dates?.length) {
      if (dates[1] !== null) {
        dates[1].setHours(23);
        dates[1].setMinutes(59);
        dates[1].setSeconds(59);
      }
      this.datesRange = dates;

      localStorage.setItem('datesRange', JSON.stringify(dates));
    }
  }

  setData(originalData: string[][]) {
    this.originalData = originalData
      .slice(1, originalData.length - 1)
      .map(row => {
        return row.reduce<Record<string, string>>((aggr, cell, index) => {
          aggr[this.columns[index]] = cell;

          return aggr;
        }, {});
      });

    localStorage.setItem('originalData', JSON.stringify(this.originalData));
  }

  setFieldNameValue(fieldName: string, value: string) {
    const fieldNameToSet =
      fieldName === 'dateFieldName' ? 'dateFieldName' : 'amountFieldName';
    this[fieldNameToSet] = value;
    localStorage.setItem(fieldName, value);
  }

  setColumnsToHide(columns: string[]) {
    this.columnsToHide = columns;
    localStorage.setItem('columnsToHide', JSON.stringify(columns));
  }

  async downloadExchangeRates() {
    const result = await this.exchangeRatesApiClient.getExchangeRatesForEuro();
    localStorage.setItem('exchangeRates', JSON.stringify(result));

    runInAction(() => {
      this.exchangeRates = result;
    });
  }

  updateFieldValue(rowIndex: number, fieldName: string, fieldValue: string) {
    // @ts-ignore
    this.originalData[rowIndex][fieldName] = fieldValue;
    // @ts-ignore
    this.filteredData[rowIndex][fieldName] = fieldValue;
  }
}
