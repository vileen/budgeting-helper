import { useRef } from 'react';
import { IModel } from './types';
import { useApplication } from '../../commons/provider';
import { PARSER_MODEL } from './constants';

export const useModel = (): IModel => {
  const app = useApplication();
  const model = useRef(app.getService<IModel>(PARSER_MODEL));

  return model.current;
};
