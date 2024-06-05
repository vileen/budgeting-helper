import {
  EXCHANGE_RATES_API_CLIENT_SERVICE_KEY,
  PARSER_MODEL,
} from './constants';

import { Model } from './model';
import { Parser } from './components/parser';

export function initialiseParser(application: Common.IApplication) {
  application.registerService(
    PARSER_MODEL,
    () =>
      new Model(application.getService(EXCHANGE_RATES_API_CLIENT_SERVICE_KEY)),
  );

  application.registerFeature({
    key: 'Parser',
    label: 'Parser',
    path: '/',
    getView: () => <Parser />,
  });
}
