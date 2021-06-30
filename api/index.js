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

instance.interceptors.response.use(
    function (response) {

        return response.data;

    },
    function (error) {
        console.warn(error);
        return Promise.reject(error);
    }
);

export const getShop = () => {
    return instance.get('/products').then((res) => {
        return res;
    });
}
