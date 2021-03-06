import { request } from './request';

import { H5_APP_STATISTICS_URL, H5_APP_STRATEGY_URL } from '@/constant';
export const getData = (data) => {
  console.log('wwww', process.env.NODE_ENV === 'development');
  return request({
    method: 'post',
    url: process.env.NODE_ENV === 'development' ? '/api' : H5_APP_STRATEGY_URL,
    data,
  });
};

export const buriedPost = (data) => {
  return request({
    method: 'post',
    url: H5_APP_STATISTICS_URL,
    data,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
};
