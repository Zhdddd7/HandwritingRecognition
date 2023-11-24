import axios from 'axios';
const service = axios.create({
  baseURL: '/',
  timeout: 100000,
  headers: {
    app_id: 'georgewashingtonuniversity_115d28_5553af',
    app_key: 'd4a63bdd2f45e29083f0b3e706a8c4e9d26fd6083b6e27f288138eaea68a5579',
  },
});

service.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log(err);
    Promise.reject(err);
  },
);

service.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  },
);

export default service;
