import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';

import {
  RES_FAILED_DEFAULT_CODE,
  RES_FAILED_DEFAULT_MSG
} from 'shared/constants';

interface ResponseErrorOption {
  code: string | number;
  message: string;
}

/**
 * 封装请求响应 Error
 */
export class ResponseError extends Error {
  code: string | number;

  constructor({ code = '', message = '' }: ResponseErrorOption) {
    super(message);
    this.code = code;
  }
}

export interface Response<T> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}

interface RequestOption {
  defaults?: AxiosRequestConfig;
  reqInterceptors?: {
    onFulfilled?: (
      config: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRejected?: (error: any) => any | undefined;
  };
  resInterceptors?: {
    onFulfilled?: (
      value: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onRejected?: (err: AxiosError) => Promise<ResponseError>;
  };
}

class Request {
  private instance: AxiosInstance;

  constructor({
    defaults = {},
    reqInterceptors = {},
    resInterceptors = {}
  }: RequestOption) {
    this.instance = Axios.create({
      ...defaults,
      timeout: 50000
    });

    this.instance.interceptors.request.use(
      reqInterceptors.onFulfilled || (cfg => cfg),
      reqInterceptors.onRejected || (err => Promise.reject(err))
    );

    const defaultOnFulFilled = (res: AxiosResponse) => res;
    const defaultOnRejected = (err: AxiosError) => {
      return !err.response
        ? Promise.reject(
            new ResponseError({
              code: RES_FAILED_DEFAULT_CODE,
              message: RES_FAILED_DEFAULT_MSG
            })
          )
        : Promise.reject(
            new ResponseError({
              code: err.response.status,
              message: err.message
            })
          );
    };

    this.instance.interceptors.response.use(
      resInterceptors.onFulfilled || defaultOnFulFilled,
      resInterceptors.onRejected || defaultOnRejected
    );
  }

  private handleResponse<T>(ret: Response<T>) {
    return ret.success
      ? ret.data
      : Promise.reject(
          new ResponseError({
            code: ret.code,
            message: ret.message
          })
        );
  }

  public static async all<T>(promises: Promise<T>[]) {
    return Axios.all<T>(promises);
  }

  public static async spread<T, R>(callback: (...args: T[]) => R) {
    return Axios.spread<T, R>(callback);
  }

  public async head(url: string) {
    const res = await this.instance.head(url);

    return res.data;
  }

  public async get<T = any>(
    url: string,
    params?: object,
    config: AxiosRequestConfig = {}
  ) {
    const { data: ret } = await this.instance.get<Response<T>>(url, {
      ...config,
      params
    });

    return this.handleResponse(ret);
  }

  public async delete(url: string) {
    const res = await this.instance.delete(url);

    return res.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    const { data: ret } = await this.instance.post<Response<T>>(
      url,
      data,
      config
    );

    return this.handleResponse(ret);
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    const { data: ret } = await this.instance.put<Response<T>>(
      url,
      data,
      config
    );

    return this.handleResponse(ret);
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    const { data: ret } = await this.instance.patch<Response<T>>(
      url,
      data,
      config
    );

    return this.handleResponse(ret);
  }
}

export default Request;
