import { IExchangeRatesApiClient, IExchangeRatesResponse } from '../types';
import { handleAxiosResponse } from '../../../common/utils';
import { AxiosInstance } from 'axios';

export class ExchangeRatesApiClient implements IExchangeRatesApiClient {
  httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getExchangeRatesForDate(date: string) {
    const response = await this.httpClient.get<IExchangeRatesResponse>(
      `?access_key=${process.env.REACT_APP_EXCHANGE_RATES_API_KEY}&date=${date}&source=EUR&currencies=PLN`,
    );

    return handleAxiosResponse(response).conversion_amounts;
  }
}
