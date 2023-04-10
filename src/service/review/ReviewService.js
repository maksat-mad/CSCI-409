import axios from "../../api/axios";

const GET_REVIEWS_URL = '/api/rating/get';
const SUBMIT_REVIEW = '/api/rating/post';

export default class ReviewService {

    static async getReviewsByProductId(id) {
        return axios({
            method: 'get',
            url: GET_REVIEWS_URL,
            params: {
                recordId: id
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async postReview(body) {
        return axios({
            method: 'post',
            url: SUBMIT_REVIEW,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }
}