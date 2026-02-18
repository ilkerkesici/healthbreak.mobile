import { User } from 'types/models';
import { APIHelper } from './ApiHelper';
import NetworkError from '../errors/NetworkError';
import { APICacheKeys } from './api.types';

enum Status {}

export interface DefaultResponse<T> {
  Data: T;
  Status: Status;
  Message: string;
}

export interface PaginationFetchResponse<T> {
  data: T[];
  total_pages: number;
  current_page: number;
}

class ApiEndpointHelper {
  getUser = async () => {
    const result = await APIHelper.get<DefaultResponse<User>>('/api/user', {});
    if (!result || result instanceof NetworkError) {
      return;
    }

    return result.Data;
  };

  loginFirebase = async (idToken: string) => {
    const result = await APIHelper.get<DefaultResponse<User>>('/api/user', {
      idToken,
    });
    if (!result || result instanceof NetworkError) {
      return;
    }

    return result.Data;
  };
}

export const APIEndpointHelper = new ApiEndpointHelper();
