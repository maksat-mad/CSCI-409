import axios from "axios";

export default class ReviewService {
    static async postReview(body) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: body,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}