import axios from "axios";

export default class ReviewService {
    static async postReview(body) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}