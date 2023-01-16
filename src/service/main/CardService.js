import axios from "axios";

export default class CardService {
    static async getItems() {
        return await axios.get('https://jsonplaceholder.typicode.com/photos', {
            params: {
                _limit: 10,
                _page: 1
            }
        });
    }
};