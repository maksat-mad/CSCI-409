import axios from "axios";

export default class ProductService {
    static async addProduct(body) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: body,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    static async getProductTypes(id) {
        // return await axios.post('https://jsonplaceholder.typicode.com/posts', {
        //     body: body,
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // });
        return {
            data: [
                {value: '1', name: "alma"},
                {value: '2', name: "almurt"},
                {value: '3', name: "banan"},
                {value: '4', name: "shabdaly"}
            ]
        };
    }

    static async getProducts(id) {
        // return await axios.post('https://jsonplaceholder.typicode.com/posts', {
        //     body: body,
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // });
        return {
            data: [
                {value: '1', name: "kyzyl alma"},
                {value: '2', name: "sary alma"},
                {value: '3', name: "zhasyl alma"},
                {value: '4', name: "alma"}
            ]
        };
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

    static async removeProduct(id) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }
}