import axios from "../../api/axios";
import cookies from "js-cookie";

const FILTER_URL = '/api/record/filter';

export default class CardService {
    static async getItems(limit = 10, page = 1, category = "all") {
        // return await axios.get('https://jsonplaceholder.typicode.com/photos', {
        //     params: {
        //         _limit: limit,
        //         _page: page
        //     }
        // });
        return axios({
            method: 'post',
            url: FILTER_URL,
            data: {
                "categoryId": ["0"],
                "maxPrice": 0,
                "minPrice": 0,
                "name": "ap",
                "productId": ["0"],
                "productTypeId": ["0"],
                "region": "astana",
                "sortingType": "DEFAULT"
            },
            params: {
                page: 1,
                pageSize: limit,
                lang: (cookies.get('i18next') || 'en').toUpperCase()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    static async getItemsByFilter(limit = 10, page = 1, filter) {
        // await axios.post(FILTER_URL + '?lang=' + (cookies.get('i18next') || 'en').toUpperCase() + `&page=${1}` + `&pageSize=${limit}`,
        //     JSON.stringify({
        //         "categoryId": [
        //             0
        //         ],
        //         "maxPrice": 0,
        //         "minPrice": 0,
        //         "name": "ap",
        //         "productId": [
        //             0
        //         ],
        //         "productTypeId": [
        //             0
        //         ],
        //         "region": "astana",
        //         "sortingType": "DEFAULT"
        //     }),
        //     {
        //         headers: {'Content-Type': 'application/json'}
        //     }
        // );

        return axios({
            method: 'post',
            url: FILTER_URL,
            data: {
                "categoryId": ["0"],
                "maxPrice": 0,
                "minPrice": 0,
                "name": "ap",
                "productId": ["0"],
                "productTypeId": ["0"],
                "region": "astana",
                "sortingType": "DEFAULT"
            },
            params: {
                page: 1,
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