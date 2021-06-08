import axios from "axios";

const instance = axios.create({
 baseURL: 'http://localhost:8080'
});

instance.interceptors.request.use(
    function (config) {
     config.headers["Content-Type"] = "application/json; charset=utf-8";
     return config;
    },
    function (error) {
     console.warn(error);
     return Promise.reject(error);
    }
);

//[GET] products 전체 조회
instance.get('/products').then((data) => console.log(data));

//[GET] 필터기능 products 남성만 조회
instance.get('/products?gender=man').then((data) => console.log(data));

//[GET] 필터기능 products id=1 데이터 조회
instance.get('/products/1').then((data) => console.log(data));

//[DELETE] 필터기능 products id=1 데이터 삭제
instance.delete('/products/1').then((data) => console.log(data));

//[GET] products 전체 조회
instance.get('/products').then((data) => console.log(data));
