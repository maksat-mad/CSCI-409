import axios from "axios";

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
        return await axios.get('https://jsonplaceholder.typicode.com/photos', {
            params: {
                _limit: limit,
                _page: page
            }
        });
    }
};