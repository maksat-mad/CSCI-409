import axios from "axios";

export default class BuyService {
    static async postBuy(body) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: body,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}