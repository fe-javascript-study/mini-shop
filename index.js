import axios from "axios"; //프로젝트 상위에 import 시켜준다.



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


instance.interceptors.response.use (
    function (response) {
        
        return response.data;
    },

    function (error) {
        console.warn(error);
        return Promise.reject(error)
    }
);



const getItems = () => {
    return instance.get('/products').then((res) => {
        return res;
    });
}

const filterShopList = (filterName, params) => {
    return instance.get(`/products?${filterName}=${params}`).then((res) => {
        return res;
    });
}

const addShopList = (params) => {
    return instance.post(`/products/`, params).then((data) => {
        return data;
    })
}

const deleteShopList = (idx) => {
    return instance.delete(`/products/${idx}`).then((data) => {
        return data;
    })
}

export {getItems, filterShopList, addShopList, deleteShopList};



