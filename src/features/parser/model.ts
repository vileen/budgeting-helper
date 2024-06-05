import { IExchangeRatesApiClient, IModel, IUploadResponse } from './types';
import { action, computed, makeObservable, observable } from 'mobx';
import { formatDate, isDate, isWithinInterval } from 'date-fns';

export class Model implements IModel {
  exchangeRatesApiClient: IExchangeRatesApiClient;
  datesRange: (Date | null)[] = [];
  originalData: Record<string, string>[] = [];
  headers: string[] = [];
  errors: string[] = [];
  txDateFieldName: string | null = null;

  constructor(exchangeRatesApiClient: IExchangeRatesApiClient) {
    this.exchangeRatesApiClient = exchangeRatesApiClient;

    makeObservable(this, {
      datesRange: observable,
      originalData: observable,
      uniqueDates: computed,
      filteredData: computed,
      headers: observable,
      txDateFieldName: observable,
      downloadDocument: action.bound,
      uploadFile: action.bound,
      downloadExchangeRates: action.bound,
      setDatesRange: action.bound,
    });
  }

  get filteredData() {
    if (
      !this.datesRange?.length ||
      this.datesRange?.[0] === null ||
      this.datesRange?.[1] === null
    )
      return [];

    return this.originalData.filter(row => {
      const dateValue =
        this.txDateFieldName && (row[this.txDateFieldName] as string);
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
    });
  }

  get uniqueDates() {
    return this.filteredData.reduce<string[]>((aggr, row) => {
      const dateValue = Object.entries(row).find(([_, value]) => {
        return isDate(new Date(value[1]));
      });

      const hasDateValue = dateValue && dateValue[1];
      const formattedDate = hasDateValue
        ? formatDate(dateValue[1], 'yyyy-MM-dd')
        : null;

      if (formattedDate && aggr.indexOf(formattedDate) === -1) {
        aggr.push(formattedDate);
      }
      return aggr;
    }, []);
  }

  downloadDocument() {
    console.log('downloadDocument');
  }

  uploadFile(response: IUploadResponse) {
    const { data, errors } = response;
    this.setHeaders(data);
    this.setData(data);
    this.setErrors(errors);
    // this.downloadExchangeRates();
  }

  setHeaders(originalData: string[][]) {
    this.headers = originalData[0];
  }

  setErrors(errors: string[]) {
    this.errors = errors;
  }

  setDatesRange(dates?: (Date | null)[] | null) {
    if (dates?.length) {
      this.datesRange = dates;
    }
  }

  setData(originalData: string[][]) {
    this.originalData = originalData
      .slice(1, originalData.length - 1)
      .map(row => {
        return row.reduce<Record<string, string>>((aggr, cell, index) => {
          aggr[this.headers[index]] = cell;

          if (!this.txDateFieldName && isDate(new Date(cell))) {
            this.txDateFieldName = this.headers[index];
          }

          return aggr;
        }, {});
      });
  }

  async downloadExchangeRates() {
    const promises = this.uniqueDates.map(date =>
      this.exchangeRatesApiClient.getExchangeRatesForDate(date),
    );
    // this.headers.push(...['Exchange rate', 'After conversion']);

    const result = await Promise.all(promises);
    console.log(result);
  }
}
