import axios from "axios";

export default class CardService {
    static async getCategory(limit = 10, page = 1, category) {
        return await axios.get('https://jsonplaceholder.typicode.com/photos', {
            params: {
                _limit: limit,
                _page: page
            }
        });
    }
};