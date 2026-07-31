import { User } from 'types/models';
import { ApiHelper } from './ApiHelper';
import NetworkError from '../errors/NetworkError';
import { DateTime } from 'luxon';

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

export interface RestorePremiumPurchasePayload {
  platform: 'ios' | 'android';
  productId: string;
  transactionId?: string | null;
  originalTransactionId?: string | null;
  purchaseToken?: string | null;
  currentPlanId?: string | null;
  transactionDate?: number | null;
}

export interface RegisterFcmTokenPayload {
  token: string;
  platform: 'ios' | 'android';
  language: string;
  external_id: string;
}

export interface UnregisterFcmTokenPayload {
  token: string;
  external_id: string;
}

const PROD_URL = 'https://common-api.venei.co';
const DEV_URL = 'http://localhost:4002';

const ANDROID_PACKAGE_NAME = 'com.healthbreak';

const CommonApiController = new ApiHelper(PROD_URL);

class CommonApi {
  getUser = async () => {
    const result = await CommonApiController.get<DefaultResponse<User>>(
      '/api/app/user',
      {},
    );
    if (!result || result instanceof NetworkError) {
      return;
    }

    return result.Data;
  };

  premiumCheck = async () => {
    const result = await CommonApiController.get<DefaultResponse<boolean>>(
      '/api/app/premium-check',
      {},
    );
    if (!result || result instanceof NetworkError) {
      return false;
    }
    return result.Data;
  };

  restorePremiumPurchase = async (payload: RestorePremiumPurchasePayload) => {
    const result = await CommonApiController.post<DefaultResponse<boolean>>(
      '/api/app/premium-restore',
      payload,
    );
    if (!result || result instanceof NetworkError) {
      return false;
    }
    return !!result.Data;
  };

  registerFcmToken = async (payload: RegisterFcmTokenPayload) => {
    const result = await CommonApiController.post<DefaultResponse<boolean>>(
      '/api/notification/fcm-token',
      payload,
    );
    if (!result || result instanceof NetworkError) {
      return false;
    }
    return !!result.Data;
  };

  unregisterFcmToken = async (payload: UnregisterFcmTokenPayload) => {
    const result = await CommonApiController.post<DefaultResponse<boolean>>(
      '/api/notification/fcm-token/delete',
      payload,
    );
    if (!result || result instanceof NetworkError) {
      return false;
    }
    return !!result.Data;
  };

  updateFcmTokenLanguage = async (language: string) => {
    const result = await CommonApiController.put<DefaultResponse<boolean>>(
      '/api/notification/fcm-token/language',
      { language },
    );
    if (!result || result instanceof NetworkError) {
      return false;
    }
    return !!result.Data;
  };

  readNotification = async (channel_id: string) => {
    const result = await CommonApiController.put<DefaultResponse<boolean>>(
      '/api/notification/read',
      { channel_id },
    );
    if (!result || result instanceof NetworkError) {
      return false;
    }
    return !!result.Data;
  };

  getSettings = async () => {
    const result = await CommonApiController.get<DefaultResponse<boolean>>(
      '/api/app/settings',
      {},
    );
    if (!result || result instanceof NetworkError) {
      return false;
    }
    return result.Data;
  };

  loginFirebase = async (idToken: string) => {
    const result = await CommonApiController.post<DefaultResponse<User>>(
      '/api/app/token',
      {
        idToken,
        timezone: DateTime.local().zoneName,
      },
    );
    if (!result || result instanceof NetworkError) {
      return;
    }

    return result.Data;
  };

  getUploadUrl = async (contentType: string) => {
    const result = await CommonApiController.post<
      DefaultResponse<{ url: string; key: string }>
    >('/api/file-upload/get-url', {
      contentType,
    });
    if (!result || result instanceof NetworkError) {
      return;
    }

    return result.Data;
  };

  verifyIOSReceipt = async (receipt: string) => {
    console.log('receipt', receipt);
    const result = await CommonApiController.post<
      DefaultResponse<{
        pkc: {
          transactionId: string;
          originalTransactionId: string;
          bundleId: string;
          productId: string;
          purchaseDate: number;
          expirationDate: number;
          quantity: number;
          web_order_line_item_id: string;
          webOrderLineItemId: string;
        };
        premium: boolean;
      } | null>
    >('/api/premium/receipt/ios', { receipt });

    if (!result || result instanceof NetworkError) {
      return;
    }
    return result.Data;
  };

  sendAndroidPayment = async (token: string, productId: string) => {
    const result = await CommonApiController.post<DefaultResponse<any>>(
      '/api/payment/receipt/android',
      { token, packageName: ANDROID_PACKAGE_NAME, productId },
    );
    if (!result || result instanceof NetworkError) {
      return;
    }
    return result.Data;
  };
}

export const CommonApiHelper = new CommonApi();
