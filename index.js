import { getShop, filterShopList } from './api/index';

const renderTotalList = () => {
  getShop().then((data) => {
    listRender(data);
  });
};

// 필터 씌우기
const shopFilters = () => {
  const filters = ['Shirts', 'Pants', 'Skirts', 'Blue', 'Yellow', 'Orange'];
  const items = document.querySelector('.shop__filters');
  filters.map((item, idx) => {
    let li = document.createElement('li');
    li.textContent = item;
    li.setAttribute('idx', idx);
    li.className = 'cate';
    console.log('ss');
    console.log(li);

    onFilter(filters, li);
    items.append(li);
  });
};

const onFilter = (data, list) => {
  list.addEventListener('click', (e) => {
    const curData = e.target.getAttribute('idx');
    const hashData = {
      Shirts: { key: 'name', value: 'shirt' },
      Pants: { key: 'name', value: 'pants' },
      Skirts: { key: 'name', value: 'skirt' },
      Blue: { key: 'color', value: 'blue' },
      Yellow: { key: 'color', value: 'yellow' },
      Orange: { key: 'color', value: 'orange' },
    };

    filterShopList(
      hashData[data[curData]].key,
      hashData[data[curData]].value,
    ).then((data) => {
      listRender(data);
    });
  });
};

// products 데이터 리스트 불러오기
const listRender = (data) => {
  const items = document.querySelector('.shop__items');

  let list = `<li class="li__item">
    <span class="item">상품명</span>
    <span class="item">성별</span>
    <span class="item">사이즈</span>
    <span class="item">컬러</span>
    <span class="item">가격</span>
    <span class="item"></span>

  </li>`;

  data.map(
    (item, idx) =>
      (list += `
    <li class="li__item" data-idx="${item.id}" key="${idx}">
      <span class="item">${item.name}</span>
      <span class="item">${item.gender}</span>
      <span class="item">${item.size}</span>
      <span class="item">${item.color}</span>
      <span class="item">${item.price}</span>
      <div class="icons">
      <button class="btn__edit"><i class="fas fa-xs fa-edit"></i></button>
      <button class="btn__delete"><i class="fas fa-xs fa-trash-alt"></i></button>
  </div>
      </li>
    `),
  ),
    (items.innerHTML = list);
};

renderTotalList();
shopFilters();
