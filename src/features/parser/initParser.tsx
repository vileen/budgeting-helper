import { PARSER_MODEL } from './constants';

import { Model } from './model';
import { Parser } from './components/parser';

export function initialiseParser(application: Common.IApplication) {
  application.registerService(PARSER_MODEL, () => new Model());

  application.registerFeature({
    key: 'Parser',
    label: 'Parser',
    path: '/',
    getView: () => <Parser />,
  });
}
