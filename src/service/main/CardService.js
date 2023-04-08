import axios from "../../api/axios";
import cookies from "js-cookie";

const FILTER_URL = '/api/record/filter';

export default class CardService {
    static async getItems(limit = 10, page = 1, category = "0", selectedCity = "astana") {
        return axios({
            method: 'post',
            url: FILTER_URL,
            data: {
                "categoryId": [category],
                "maxPrice": 0,
                "minPrice": 0,
                "name": "",
                "productId": ["0"],
                "productTypeId": ["0"],
                "region": selectedCity,
                "sortingType": "DEFAULT"
            },
            params: {
                page: page,
                pageSize: limit,
                lang: (cookies.get('i18next') || 'en').toUpperCase()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static async getItemsByFilter(limit = 10, page = 1, filter) {
        return axios({
            method: 'post',
            url: FILTER_URL,
            data: {
                "categoryId": [filter.category],
                "maxPrice": filter.priceTo === '' ? '0' : filter.priceTo,
                "minPrice": filter.priceFrom === '' ? '0' : filter.priceFrom,
                "name": filter.query,
                "productId": ["0"],
                "productTypeId": ["0"],
                "region": filter.city,
                "sortingType": filter.sort
            },
            params: {
                page: page,
                pageSize: limit,
                lang: (cookies.get('i18next') || 'en').toUpperCase()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static async getItemById(id, selectedCity) {
        return axios({
            method: 'post',
            url: FILTER_URL,
            data: {
                "categoryId": ["0"],
                "maxPrice": 0,
                "minPrice": 0,
                "name": "",
                "productId": ["0"],
                "productTypeId": ["0"],
                "region": selectedCity,
                "sortingType": "DEFAULT"
            },
            params: {
                page: 1,
                pageSize: 1000,
                lang: (cookies.get('i18next') || 'en').toUpperCase()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.data.data.content)
            .then(records => records.filter(record => record.id === id));
    }
};
