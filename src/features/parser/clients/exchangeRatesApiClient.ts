import { IExchangeRatesApiClient, IExchangeRatesResponse } from '../types';
import { handleAxiosResponse } from '../../../common/utils';
import { AxiosInstance } from 'axios';

export class ExchangeRatesApiClient implements IExchangeRatesApiClient {
  httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getExchangeRatesForEuro() {
    const response = await this.httpClient.get<IExchangeRatesResponse>(
      `/query?function=FX_DAILY&from_symbol=EUR&to_symbol=PLN&apikey=${process.env.REACT_APP_EXCHANGE_RATES_API_KEY}`,
    );

    return handleAxiosResponse(response)['Time Series FX (Daily)'];
  }
}
