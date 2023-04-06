import axios from "axios";
import cookies from "js-cookie";

export default class CardService {
    static async getItems(limit = 10, page = 1, category = "all") {
        return await axios.get('https://jsonplaceholder.typicode.com/photos', {
            params: {
                _limit: limit,
                _page: page
            }
        });
    }
    static async getItemsByFilter(limit = 10, page = 1, filter) {
        // return axios({
        //     method: 'get',
        //     url: 'http://naturalgoods-env-1.eba-tugt88fn.eu-north-1.elasticbeanstalk.com/api/record/filter',
        //     withCredentials: false,
        //     data: {
        //         "categoryId": [],
        //         "maxPrice": 0,
        //         "minPrice": 0,
        //         "name": "apple",
        //         "productId": [],
        //         "productTypeId": [],
        //         "region": "almaty",
        //         "sortingType": "NAME"
        //     },
        //     params: {
        //         page: 0,
        //         pageSize: limit,
        //         lang: (cookies.get('i18next') || 'en').toUpperCase()
        //     },
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // });
        // const filter_URL = 'http://naturalgoods-env-1.eba-tugt88fn.eu-north-1.elasticbeanstalk.com/api/record/filter';
        // return await axios.get(filter_URL + `?page=${0}` + `&pageSize=${limit}` + '&lang=' + (cookies.get('i18next') || 'en').toUpperCase(),
        //     JSON.stringify({
        //         "categoryId": [],
        //         "maxPrice": 0,
        //         "minPrice": 0,
        //         "name": "al",
        //         "productId": [],
        //         "productTypeId": [],
        //         "region": "almaty",
        //         "sortingType": "NAME"
        //     }),
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': 'http://localhost:3000/'
        //         }
        //     }
        // );
        return await axios.get('https://jsonplaceholder.typicode.com/photos', {
            params: {
                _limit: limit,
                _page: page
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