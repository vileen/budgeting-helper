export interface IUploadResponse {
  data: string[][];
  errors: string[];
}

export interface ICell {
  [key: string]: string;
}

export interface IModel {
  datesRange: (Date | null)[];
  dateFieldName: string | null;
  amountFieldName: string | null;
  columns: string[];
  filteredColumns: string[];
  columnsToHide: string[];
  filteredData: ICell[];
  outputData: ICell[];
  uploadFile(results: IUploadResponse): void;
  setDatesRange(dates?: (Date | null)[] | null): void;
  setFieldNameValue(fieldName: string, value: string): void;
  setColumnsToHide(columns: string[]): void;
  downloadExchangeRates(): Promise<void>;
  updateFieldValue(
    rowIndex: number,
    fieldName: string,
    fieldValue: string,
  ): void;
}

export interface IExchangeRatesResponse {
  [key: string]: Record<string, Record<string, string>>;
}

export interface IExchangeRatesApiClient {
  getExchangeRatesForEuro: () => Promise<
    Record<string, Record<string, string>>
  >;
}
