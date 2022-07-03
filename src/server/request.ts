import axios from 'axios';

// Set baseURL when debugging production url in dev mode
axios.defaults.withCredentials = false;
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// http response 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 返回接口返回的错误信息
      return Promise.reject(error.response.data);
    }
  }
);

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 */
export async function request(options) {
  try {
    /**
     * 返回远程请求数据
     */
    const response = await axios(options);
    if (options.fileJSON) {
      return { response, code: 0 };
    }
    if (options.csv) {
      return { code: 0, response };
    }

    if (response.data instanceof Blob) {
      if (response.config.headers && response.config.headers.token) {
        return { status: 200, response };
      }

      return { code: 0, response };
    }
    const { data } = handleResponse(response, options);
    return { response, data };
  } catch (error) {
    const response: any = {
      data: error,
    };
    if (options.notMsg) {
      response.data.notMsg = options.notMsg;
    }
    return { response, data: response.data };
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response, options) {
  const { data, status } = response;
  if (response.config.headers.buried) {
    return {};
  }
  if (data.code === 0) {
    return { data };
  } else {
    return { data };
  }
}
