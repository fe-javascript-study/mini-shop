import { getShop, filterShopList, deleteShopList } from "./api/index";

const renderTotalList =  () => {
    getShop().then((data) => {
        listRender(data)
    })
}

const shopFilters = () => {
    const filters = ['셔츠','바지','스커트','블루','옐로우'];
    const itmes = document.querySelector('.shop--filters')

    filters.map((item,idx) => {
        let li = document.createElement('li');
        li.textContent = item;
        li.setAttribute('idx', idx);
        onFilter(filters,li);
        itmes.append(li);
    });
}

const onFilter = (data,list) => {
    list.addEventListener('click',(e) => {
        const curData = e.target.getAttribute('idx')
        const hashData = {셔츠:{key:'name',value:'shirt'},바지:{key:'name',value:'pants'},스커트:{key:'name',value:'skirt'},옐로우:{key:'color',value:'yellow'},블루:{key:'color',value:'blue'}}

        filterShopList(hashData[data[curData]].key,hashData[data[curData]].value).then((data) => {
            listRender(data);
        })
    });
}

const listRender = (data) => {
    const contents = document.querySelector('.shop--contents');

    let list = `<li>
            <span>상품명</span>
            <span>성별</span>
            <span>사이즈</span>
            <span>컬러</span>
            <span>가격</span>
        </li>`;

    data.map((item, idx) => list += `<li data-idx="${item.id}" key="${idx}">
            <span>${item.name}</span>
            <span>${item.gender}</span>
            <span>${item.size}</span>
            <span>${item.color}</span>
            <span>${item.price}</span>
            <span>
                <button>수정</button>
                <button class="btn--delete">삭제</button>
            </span>
        </li>`)

    contents.innerHTML = list;

    onDelete()
}

const onDelete = () => {
    const btn = document.querySelectorAll('.btn--delete');

    console.log(btn)

    Array.from(btn).map((item) => {
        item.addEventListener('click',(e) => {
            const deleteNum = e.target.parentElement.parentElement.getAttribute('data-idx')

            deleteShopList(deleteNum).then((data) => {
                renderTotalList()
            })
        })
    })
}

renderTotalList()
shopFilters()
