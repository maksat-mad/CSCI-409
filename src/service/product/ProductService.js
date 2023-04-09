import axios from "../../api/axios";
import cookies from "js-cookie";

const PRODUCT_LIST_URL = '/api/product/list';
const PRODUCTS_URL = '/api/productType/list';

export default class ProductService {
    static async addProduct(body) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: body,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    static async updateProduct(body) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: body,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    static async getProductTypes(id) {
        return axios({
            method: 'get',
            url: PRODUCT_LIST_URL,
            params: {
                categoryId: id,
                lang: (cookies.get('i18next') || 'en').toUpperCase()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data.list);
    }

    static async getProducts(id) {
        return axios({
            method: 'get',
            url: PRODUCTS_URL,
            params: {
                productId: id,
                lang: (cookies.get('i18next') || 'en').toUpperCase()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data.list);
    }

    static async getProductsSale() {
        return {
            data: [
                {
                    "id": 1,
                    "url": "https://via.placeholder.com/600/92c952"
                },
                {
                    "id": 2,
                    "url": "https://via.placeholder.com/600/771796"
                },
                {
                    "id": 3,
                    "url": "https://via.placeholder.com/600/24f355"
                },
                {
                    "id": 4,
                    "url": "https://via.placeholder.com/600/d32776"
                },
                {
                    "id": 5,
                    "url": "https://via.placeholder.com/600/f66b97"
                }
            ]
        }
    }

    static async getProductsNotSale() {
        return {
            data: [
                {
                    "id": 1,
                    "url": "https://via.placeholder.com/600/92c952"
                },
                {
                    "id": 2,
                    "url": "https://via.placeholder.com/600/771796"
                },
                {
                    "id": 3,
                    "url": "https://via.placeholder.com/600/24f355"
                },
                {
                    "id": 4,
                    "url": "https://via.placeholder.com/600/d32776"
                },
                {
                    "id": 5,
                    "url": "https://via.placeholder.com/600/f66b97"
                }
            ]
        }
    }

    static async removeProduct(id) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }
}