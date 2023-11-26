import request from '../utils/request';

export function mathpixText(data: any) {
  return request({
    url: 'https://api.mathpix.com/v3/text',
    method: 'post',
    data: data,
  });
}

export function awsapprunnerLogin(data: any) {
  return request({
    url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/login',
    method: 'post',
    data: data,
  });
}
