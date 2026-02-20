import { BASE_URL } from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import NetworkError from '../errors/NetworkError';
import { i18n } from 'constants/i18n';
import { DateTime } from 'luxon';
import { APICacheKeys } from './api.types';
import { useAppInitStore } from 'store/useAppInitStore';

export class ApiHelper {
  private cacheResult: Record<
    string,
    { date: DateTime; response: any; key: APICacheKeys }
  > = {};

  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getOptions = (): AxiosRequestConfig => {
    const headerParameters: {
      'Accept-Language': string;
      Authorization?: string;
      'x-access-token'?: string;
      pk: string;
    } = {
      'Accept-Language': i18n.locale,
      pk: '19aa8575-6c69-4eb8-818d-204ba8aed156',
    };
    const localToken = useAppInitStore.getState().token;
    if (localToken) {
      headerParameters['x-access-token'] = `${localToken}`;
      headerParameters.Authorization = `Bearer ${localToken}`;
    }

    return { headers: headerParameters, params: {} };
  };

  async get<T>(
    endpoint: string,
    params: any,
    cache?: { status: boolean; key: APICacheKeys },
  ): Promise<T | NetworkError> {
    try {
      if (cache?.status && this.cacheResult[endpoint]) {
        // TODO cache süresi belirle

        return this.cacheResult[endpoint].response as T;
      }

      const options = this.getOptions();
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        ...options,
        params: { ...options.params, ...params },
      });
      if (cache?.status) {
        this.cacheResult[endpoint] = {
          date: DateTime.now(),
          response: response.data,
          key: cache.key,
        };
      }
      return response.data;
    } catch (error) {
      return new NetworkError('Server Error');
    }
  }

  async post<T>(
    endpoint: string,
    body: any,
    cache?: { status: boolean; key: APICacheKeys },
  ): Promise<T | NetworkError> {
    try {
      const key = `${endpoint}-${JSON.stringify(body)}`;
      if (cache?.status && this.cacheResult[key]) {
        // TODO cache süresi belirle
        return this.cacheResult[key].response as T;
      }
      console.log(`${this.baseUrl}${endpoint}`, body);
      const response = await axios.post(
        `${this.baseUrl}${endpoint}`,
        body,
        this.getOptions(),
      );
      console.log('Response 1: ', response);
      
      if (cache?.status) {
        this.cacheResult[key] = {
          date: DateTime.now(),
          response: response.data,
          key: cache.key,
        };
      }
      return response.data;
    } catch (error) {
      console.log('error', error);
      return new NetworkError('Server Error');
    }
  }

  async put<T>(endpoint: string, body: any): Promise<T | NetworkError> {
    try {
      const response = await axios.put(
        `${this.baseUrl}${endpoint}`,
        body,
        this.getOptions(),
      );

      return response.data;
    } catch (error) {
      return new NetworkError('Server Error');
    }
  }

  async patch<T>(endpoint: string, body: any): Promise<T | NetworkError> {
    try {
      const response = await axios.patch(
        `${this.baseUrl}${endpoint}`,
        body,
        this.getOptions(),
      );

      return response.data;
    } catch (error) {
      return new NetworkError('Server Error');
    }
  }

  async delete<T>(endpoint: string): Promise<T | NetworkError> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}${endpoint}`,
        this.getOptions(),
      );
      return response.data;
    } catch (error) {
      return new NetworkError('Server Error');
    }
  }

  clearCache(keys: APICacheKeys[]) {
    const newCache: Record<
      string,
      { date: DateTime; response: any; key: APICacheKeys }
    > = {};
    Object.keys(this.cacheResult).forEach(cacheEndpoint => {
      if (!keys.includes(this.cacheResult[cacheEndpoint].key)) {
        newCache[cacheEndpoint] = this.cacheResult[cacheEndpoint];
      }
    });
    this.cacheResult = newCache;
  }
}

export const APIHelper = new ApiHelper(BASE_URL);
