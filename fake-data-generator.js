let faker = require('faker');

let db = { products: [] };

const COLOR = ['blue','yellow','orange']
const GENDER = ['female', 'man']
const SIZE = ['large','medium', 'small']
const PRODUCTS_NAMES = ['pants','shirt', 'skirt']


let i = null;

for (i=0; i < 100; i++) {
    db.products.push({
        id: i,
        gender: GENDER[Math.floor(Math.random()* GENDER.length)],
        size: SIZE[Math.floor(Math.random()* SIZE.length)],
        color: COLOR[Math.floor(Math.random()* COLOR.length)],
        price: faker.commerce.price(),
        name: PRODUCTS_NAMES[Math.floor(Math.random()* PRODUCTS_NAMES.length)],
    });
}

console.log(JSON.stringify(db))
