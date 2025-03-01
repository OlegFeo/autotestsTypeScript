import * as fs from 'fs';
import path from 'path';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import FormData from 'form-data';

interface IRetryCall<T> extends IRetryConfig {
  requestFn: () => Promise<AxiosResponse<T>>;
}

interface IRetryConfig {
  maxRetries: number;
  delayMs: number;
  conditionValue?: number | string;
  conditionFn: (response: any, conditionValue: any) => boolean;
}

export class BaseApiClient {
  public static async fileUpload<T>(url: string, filePath: string): Promise<AxiosResponse<T>> {
    const file = path.resolve(filePath);

    const formData = new FormData();
    formData.append('file', fs.createReadStream(file), path.basename(file));

    return axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  }

  public static async post<T>(
    url: string,
    options: AxiosRequestConfig,
    retry?: IRetryConfig,
  ): Promise<AxiosResponse<T>> {
    const request_ = (): Promise<AxiosResponse<T>> => axios.post<T>(url, options.data, options);

    if (!retry?.maxRetries) {
      return request_();
    }

    return this.retryWithDelay({ requestFn: request_, ...retry });
  }

  public static async get<T>(
    url: string,
    options?: AxiosRequestConfig,
    retry?: IRetryConfig,
  ): Promise<AxiosResponse<T>> {
    const request_ = () => axios.get<T>(url, options);

    if (!retry?.maxRetries) {
      return request_();
    }

    return this.retryWithDelay({ requestFn: request_, ...retry }).then((response) => {
      return response;
    });
  }

  public static async retryWithDelay<T>(config: IRetryCall<T>): Promise<AxiosResponse<T>> {
    const { requestFn, conditionFn, maxRetries = 10, delayMs = 1000, conditionValue } = config;

    return new Promise((resolve, reject) => {
      let retries = 0;

      const makeRequest = () => {
        requestFn()
          .then((response) => {
            if (conditionFn(response, conditionValue)) {
              resolve(response);
            } else if (retries < maxRetries) {
              retries++;
              setTimeout(makeRequest, delayMs);
            } else {
              reject(new Error('Max retries exceeded'));
            }
          })
          .catch((error: Error) => {
            if (retries < maxRetries) {
              retries++;
              setTimeout(makeRequest, delayMs);
            } else {
              reject(error);
            }
          });
      };

      makeRequest();
    });
  }
}
