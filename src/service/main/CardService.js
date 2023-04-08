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
                "name": "ap",
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
                "maxPrice": filter.priceFrom,
                "minPrice": filter.priceTo,
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
    static async getItemById(id) {
        return await axios.get('https://jsonplaceholder.typicode.com/photos/' + id);
    }

    static async getReviewsByProductId(id) {
        return await axios.get('https://jsonplaceholder.typicode.com/comments/');
    }
};