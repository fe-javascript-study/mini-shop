const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    return config;
  },
  function (error) {
    console.warn(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.warn(error);
    return Promise.reject(error);
  },
);

// products 불러오기
export const getShop = () => {
  return instance.get('/products').then((res) => {
    return res;
  });
};

// 필터 씌우기
export const filterShopList = (filterName, params) => {
  return instance.get(`./products?${filterName}=${params}`).then((res) => {
    console.log('필터 : ' + filterName + params);
    return res;
  });
};
