import axios from "../../api/axios";
import cookies from "js-cookie";

const PRODUCT_LIST_URL = '/api/product/list';
const PRODUCTS_URL = '/api/productType/list';

const ADD_PRODUCT_URL = '/api/record/add';
const EDIT_PRODUCT_URL = '/api/record/edit';
const DELETE_PRODUCT_URL = '/api/record/delete';

const GET_SALE_NOT_SALE_URL = '/api/record/getByStatus';

export default class ProductService {
    static async addProduct(body) {
        return axios({
            method: 'post',
            url: ADD_PRODUCT_URL,
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }

    static async updateProduct(body) {
        return axios({
            method: 'post',
            url: EDIT_PRODUCT_URL,
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
        return axios({
            method: 'get',
            url: GET_SALE_NOT_SALE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                status: 'FOR_SALES'
            }
        });
    }

    static async getProductsNotSale() {
        return axios({
            method: 'get',
            url: GET_SALE_NOT_SALE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                status: 'NOT_FOR_SALES'
            }
        });
    }

    static async removeProduct(id) {
        return axios({
            method: 'post',
            url: DELETE_PRODUCT_URL,
            params: {
                recordId: id
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }
}