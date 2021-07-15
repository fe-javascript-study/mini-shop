
import { getItems, filterShopList, addShopList, deleteShopList} from "./index";


const renderTotalList = () => {
	getItems().then((data) => {
		listRender(data)
	});
}

const shopFilters = () => {
	const filters = ['shirts', 'pants', 'skirt', 'blue', 'yellow', 'orange'];
	const items = document.querySelector('.filter');
	
	filters.map((item, idx) => {
		items.innerHTML = filters;
		let li = document.createElement('li');
		li.innerHTML = item;
		li.setAttribute('idx', idx);
		onFilter(filters, li);
		items.append(li);
		
	});
}

const onFilter = (data, list) => {
	list.addEventListner('click', (e) => {
		const currentData = e.target.getAttribute('idx');
		const hashData = {
			Shirts: {key: 'name', value: 'shirt'}, Pants: {key: 'name',value: 'pants'},Skirt: {key: 'name',value: 'skirt'},Yellow: {key: 'color',value: 'yellow'},Blue: {key: 'color',value: 'blue'},Orange: {key: 'color',value: 'orange'}
		      };

		 filterShopList(
			hashData[data[currentData]].key,
			hashData[data[currentData]].value
		    ).then((data) => {
			 listRender(data);
		 });
	});
}


const listRender = (data) => {
	const contents = document.querySelector('.shop__contents');
	let list = `
		<li class="inform">
			<span class="inform__span">상품명</span>
			<span class="inform__span">성별</span>
			<span class="inform__span">사이즈</span>
			<span class="inform__span">컬러</span>
			<span class="inform__span">가격</span>
		</li>`;
		
		data.map((item, idx) => list += `
		    <div class="container">
			<li class="inform__index "data-idx="${item.id}" key="${idx}">
				<span class="inform__span">${item.name}</span>
				<span class="inform__span">${item.gender}</span>
				<span class="inform__span">${item.size}</span>
				<span class="inform__span">${item.color}</span>
				<span class="inform__span">${item.price}</span>
	    		</li>
			<span>
			<button class="inform-btn edit__btn">✏️</button>
			<button class="inform-btn del__btn">❌</button>
			</span>
		    </div>`);
    
	contents.innerHTML = list;

	onAdd();
	onDelete();

}

const onDelete = () => {
	const btn = document.querySelectorAll('.del__btn');

	Array.from(btn).map((item) => {
		item.addEventListener('click', (e) => {
			const deleteNum = e.target.parentElement.parentElement.getAttribute('data-idx');

			deleteShopList(deleteNum).then((data) => {
				renterTotalList(data);
			});
		});
	});
}

const onAdd = () => {
	const addBtn = document.querySelector('.modal__btn');
	const modalBox = document.createElement('div');
	const inputs = ['name', 'gender', 'size', 'color', 'price'];
	const confirmBtn = document.createElement('button');

	modalBox.classList.add('modal-box');

	inputs.map((item, idx) => {
		let input = document.createElement('input');
		let label = document.createElement('label');

		input.name = item;
		input.id = item;
		input.autocomplete = 'off';

		
		label.htmlFor = item;
		label.textContent = item;

		confirmBtn.textContent = '✔️';
		confirmBtn.type = 'button';

		modalBox.append(label);
		modalBox.append(input);
		modalBox.append(confirmBtn);

	});

	confirmBtn.addEventListener('click', () => {
		let inputValues = document.querySelectorAll('input');
		let newValue  = {};

		Array.from(inputValues).map((item) => {
			if(!item.value.length) {
				item.classList.add('error');
			} else {
				item.classList.remove('error');
			}
			newValue[item.name] = item.value;
		});

		if(Object.values(newValue).every((item) => item.length)) {
			addShopList(newValue).then((data) => {
				if(data) {
					modalBox.remove();
			
				}
				renderTotalList();
			})
		} else {
			alert('다시 입력');
		}
	});

	addBtn.addEventListener('click', () => {
		document.body.append(modalBox);
	})
}



function init() {
	renderTotalList();
	shopFilters();
}

init();


