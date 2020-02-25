import { AxiosResponse } from 'axios';

import Request, { Response, ResponseError } from './http';
import {
  REQ_BASE_PATH,
  RES_FAILED_DEFAULT_CODE,
  RES_FAILED_DEFAULT_MSG,
  RES_SUCCESS_DEFAULT_CODE,
  RES_SUCCESS_DEFAULT_MSG,
  API_APP_ID,
  API_APP_SECRET
} from 'shared/constants';

/**
 * 服务器返回数据统一格式
 */
interface ServerResponse {
  code: 0 | 1; // 0 返回失败，1 返回成功
  msg: string; // 当 code 返回 0 时候包含错误提示
  data?: any; // 具体接口数据信息
}

const request = new Request({
  defaults: {
    baseURL: REQ_BASE_PATH,
    headers: {
      common: {
        app_id: API_APP_ID,
        app_secret: API_APP_SECRET
      }
    }
  },
  interceptors: {
    onFulfilled: (res: AxiosResponse<ServerResponse>) => {
      const {
        data: resData,
        config: { responseType }
      } = res;
      let result: Response<any> = {
        data: null,
        code: RES_SUCCESS_DEFAULT_CODE,
        message: RES_SUCCESS_DEFAULT_MSG,
        success: true
      };

      if (resData === null || resData === void 0) {
        result.data = {};
      } else if (
        typeof resData !== 'object' ||
        (responseType && responseType !== 'json')
      ) {
        result.data = resData;
      } else {
        result = {
          data: resData.data,
          code: resData.code,
          message: resData.msg,
          success: resData.code === RES_SUCCESS_DEFAULT_CODE
        };
      }

      return {
        ...res,
        data: result
      };
    },
    onRejected: err => {
      if (!err.response) {
        return Promise.reject(
          new ResponseError({
            code: RES_FAILED_DEFAULT_CODE,
            message: RES_FAILED_DEFAULT_MSG
          })
        );
      }

      const { code, msg } = err.response.data as ServerResponse;

      return Promise.reject(
        new ResponseError({
          code: code || err.response.status,
          message: msg || ''
        })
      );
    }
  }
});

export default request;
