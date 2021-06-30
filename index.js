import { getShop } from "./api/index";


const renderTotalList = () => {
    const contents = document.querySelector('.shop--contents');

    let list = '';

    getShop().then((data) => {
        data.map((item, idx) => contents.innerHTML += `<li data-idx="${idx}">
            <span>${item.name}</span>
            <span>${item.gender}</span>
            <span>${item.size}</span>
            <span>${item.color}</span>
            <span>${item.price}</span>
            <span>
                <button>수정</button>
                <button>삭제</button>
            </span>
        </li>`)
    })
}

renderTotalList()
