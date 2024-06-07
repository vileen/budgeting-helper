import { createHttpClient } from '../../../common/clients/clientFactory';
import { EXCHANGE_RATES_API_CLIENT_SERVICE_KEY } from '../constants';
import { ExchangeRatesApiClient } from './exchangeRatesApiClient';

export const initialiseClients = (application: Common.IApplication) => {
  const exchangeRatesAxiosClient = createHttpClient({
    // could be moved to config
    baseURL: 'https://www.alphavantage.co',
  });

  application.registerService(
    EXCHANGE_RATES_API_CLIENT_SERVICE_KEY,
    () => new ExchangeRatesApiClient(exchangeRatesAxiosClient),
  );
};
