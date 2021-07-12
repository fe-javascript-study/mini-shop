import { getShop, filterShopList, deleteShopList, addShopList, editShopList } from "./api/index";

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
            <div>
                <button class="btn-edit">수정</button>
                <button class="btn--delete">삭제</button>
            </div>
        </li>`)

    contents.innerHTML = list;

    onDelete();
    onAdd();
    onEdit();
}

const onDelete = () => {
    const btn = document.querySelectorAll('.btn--delete');

    Array.from(btn).map((item) => {
        item.addEventListener('click',(e) => {
            const deleteNum = e.target.parentElement.parentElement.getAttribute('data-idx')

            deleteShopList(deleteNum).then((data) => {
                renderTotalList()
            })
        })
    })
}

const onAdd = () => {
    const btn = document.querySelector('.btn--add');

    const popupBox = document.createElement('div');
    const inputs = ['name','gender','size','color','price'];
    const confirmBtn = document.createElement('button');

    popupBox.classList.add('popup-box');

    inputs.map((item,idx) => {
        let input = document.createElement('input');
        let label = document.createElement('label');

        input.name = item;
        input.id = item;
        input.autocomplete = 'off';

        label.textContent = item;
        label.htmlFor = item;

        confirmBtn.textContent = '확인';
        confirmBtn.type = 'button';

        popupBox.append(label);
        popupBox.append(input);
        popupBox.append(confirmBtn);
    });

    confirmBtn.addEventListener('click', () => {
       let inputValues = document.querySelectorAll('input');
       let newValue = {};


       Array.from(inputValues).map((item) => {
           if(!item.value.length) {
               item.classList.add('error');
           }else{
               item.classList.remove('error');
           }
           newValue[item.name]  = item.value;
       });

       if(Object.values(newValue).every((item) => item.length)){
           addShopList(newValue).then((data) => {
               if(data){
                   popupBox.remove();
               }
               renderTotalList();
           })
       }else{
           alert('입력을 다시 해주세요.');
       }
    });

    btn.addEventListener('click', () => {
        document.body.append(popupBox);
    });
}

const onEdit = () => {
    const btn = document.querySelectorAll('.btn-edit');

    Array.from(btn).map((item) => {
     item.addEventListener('click',(e) => {
            const list = e.target.parentElement.parentElement.children;
            const idx = e.target.parentElement.parentElement.getAttribute('data-idx');
            let payload = Object.assign({name:'',gender:'',size:'',color:'',price:''});

            if(item.textContent === '확인'){
                item.textContent = '수정';

                Array.from(list).map((item,idx) => {
                    if(item.tagName === 'SPAN'){
                        payload[Object.keys(payload)[idx]] = item.textContent;
                    }
                });

                editShopList(idx, payload).then(()=>{
                    renderTotalList()
                });
            }

            if(item.textContent === '수정'){
                item.textContent = '확인';

                Array.from(list).map((item,idx) => {
                    if(item.tagName === 'SPAN'){
                        payload[Object.keys(payload)[idx]] = item.textContent;

                        item.setAttribute('contenteditable',true);

                        if(idx === 0){
                            item.focus();
                        }
                    }
                });
            };
        });
    });
}

renderTotalList()
shopFilters()
