import axios from "../../api/axios";

const BUY_URL = '/api/purchase/request';
export default class BuyService {
    static async postBuy(body) {
        return axios({
            method: 'post',
            url: BUY_URL,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }
}