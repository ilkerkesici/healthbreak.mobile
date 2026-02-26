import { OnboardingAnswersPayload, OnboardingProfile } from 'types/models';
import { ApiHelper } from './ApiHelper';
import NetworkError from '../errors/NetworkError';

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

const PROD_URL = 'https://common-api.venei.co';
const DEV_URL = 'http://localhost:4003';

const ApiController = new ApiHelper(DEV_URL);

class ApiEndpointHelper {
  createOnboardingProfile = async (payload: OnboardingAnswersPayload) => {
    const result = await ApiController.post<DefaultResponse<OnboardingProfile>>(
      '/api/profile',
      payload,
    );

    if (!result || result instanceof NetworkError) {
      return;
    }

    return result.Data;
  };

  getOnboardingProfile = async () => {
    const result = await ApiController.get<DefaultResponse<OnboardingProfile>>(
      '/api/profile',
      {},
    );

    if (!result || result instanceof NetworkError) {
      return;
    }

    return result.Data;
  };
}

export const APIEndpointHelper = new ApiEndpointHelper();
