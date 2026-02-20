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

const PROD_URL = 'https://common-api.venei.co';
const DEV_URL = 'http://localhost:4002';

const ANDROID_PACKAGE_NAME = 'com.looksgoodai';

const CommonApiController = new ApiHelper(DEV_URL);

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
