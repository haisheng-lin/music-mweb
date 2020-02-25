// request
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN as string;
const API_PREFIX_PATH = process.env.REACT_APP_API_PREFIX_PATH as string;
export const REQ_BASE_PATH = API_DOMAIN + API_PREFIX_PATH;
export const RES_SUCCESS_DEFAULT_CODE = 1;
export const RES_FAILED_DEFAULT_CODE = 0;
export const RES_SUCCESS_DEFAULT_MSG = 'success';
export const RES_FAILED_DEFAULT_MSG = 'uncaught exception';

// request secret
export const API_APP_ID = process.env.REACT_APP_API_APP_ID as string;
export const API_APP_SECRET = process.env.REACT_APP_API_APP_SECRET as string;
