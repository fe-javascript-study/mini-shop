// import axios from "axios";

// 상품 추가 모달 창
const openItemAdd = document.getElementById("openItemAddBtn");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector("modal__overlay");
const closeBtn = modal.querySelector("modal__closeBtn");

// 모달 창 열기
const openModal = () => {
    console.log("click");
    modal.classList.remove("hidden");
}
// 모달 창 닫기
const closeModal = () => {
    modal.classList.add("hidden");
}
// overlay.addEventListener("click", closeModal);
// closeBtn.addEventListener("click", closeModal);
openItemAdd.addEventListener("click", openModal);
 
/*
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
*/

