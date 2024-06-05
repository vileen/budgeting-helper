import { AxiosResponse } from 'axios';
import { StatusCodes } from './constants';

export function handleAxiosResponse<TData = any>(
  resp: AxiosResponse<TData>,
): TData {
  const statusCode = resp.status;
  if (statusCode === StatusCodes.NotFound404) {
    throw new Error(`Resource not found: ${statusCode}`);
  }
  if (statusCode === StatusCodes.BadRequest400) {
    throw new Error(`Malformed request payload`);
  }
  if (statusCode === StatusCodes.ServerError500) {
    throw new Error(`Server error`);
  }
  return resp.data;
}
