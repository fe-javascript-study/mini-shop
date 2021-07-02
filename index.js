import { getShop } from "./api/index";


const renderTotalList =  () => {
    const contents = document.querySelector('.shop--contents');

    let list = `<li>
            <span>상품명</span>
            <span>성별</span>
            <span>사이즈</span>
            <span>컬러</span>
            <span>가격</span>
        </li>`;

    getShop().then((data) => {
        data.map((item, idx) => list += `<li data-idx="${idx}">
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

        contents.innerHTML = list;
    })
}

renderTotalList()
