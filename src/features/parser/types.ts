export interface IUploadResponse {
  data: string[][];
  errors: string[];
}

export interface ICell {
  [key: string]: string;
}

export interface IModel {
  datesRange: (Date | null)[];
  headers: string[];
  filteredData: ICell[];
  uploadFile: (results: IUploadResponse) => void;
  downloadDocument: () => void;
  setDatesRange: (dates?: (Date | null)[] | null) => void;
  downloadExchangeRates: () => Promise<void>;
}

export interface IExchangeRatesResponse {
  conversion_amounts: {
    [key: string]: number;
  };
  base_code: string;
  year: number;
  month: number;
  day: number;
}

export interface IExchangeRatesApiClient {
  getExchangeRatesForDate: (date: string) => Promise<{
    [key: string]: number;
  }>;
}
