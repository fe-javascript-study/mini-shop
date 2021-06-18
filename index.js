import { getShop } from "./api/index";

const getShopData = getShop().then((data) => console.log(data))

