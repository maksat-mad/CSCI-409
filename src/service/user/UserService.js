import axios from "../../api/axios";

const IN_PROGRESS_URL = '/api/purchase/purchaseList';
const PURCHASE_STATUS = '/api/purchase/changeStatus';

const BOUGHT_HISTORY_URL = '/api/purchase/purchaseList';
const SOLD_HISTORY_URL = '/api/purchase/customerList';

export default class UserService {
    static async getRequests() {
        return axios({
            method: 'get',
            url: IN_PROGRESS_URL,
            params: {
                status: 'PROCESSING'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data.list);
    }

    static async cancelRequest(id) {
        return axios({
            method: 'post',
            url: PURCHASE_STATUS,
            params: {
                purchaseId: id,
                purchaseStatus: 'REJECTED'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async acceptRequest(id) {
        return axios({
            method: 'post',
            url: PURCHASE_STATUS,
            params: {
                purchaseId: id,
                purchaseStatus: 'CONFIRMED'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async getBoughtHistory() {
        return axios({
            method: 'get',
            url: BOUGHT_HISTORY_URL,
            params: {
                status: 'CONFIRMED'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data.list);
    }

    static async getSoldHistory() {
        return axios({
            method: 'get',
            url: SOLD_HISTORY_URL,
            params: {
                status: 'CONFIRMED'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.data.list);
    }

    static async getUser(query) {
        return {
            data: [
                {
                    id: 1,
                    email: 'maksat111@gmail.com',
                    blocked: false,
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 2,
                    email: 'maksat222@gmail.com',
                    blocked: false,
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 3,
                    email: 'maksat333@gmail.com',
                    blocked: false,
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 4,
                    email: 'maksat444@gmail.com',
                    blocked: true,
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 5,
                    email: 'maksat555@gmail.com',
                    blocked: true,
                    phoneNumber: "+7(705)100-10-10"
                },
            ]
        };
    }

    static async blockUser(id) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    static async unblockUser(id) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    static async makeAdmin(id) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    static async removeFromAdmin(id) {
        return await axios.post('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
    }

    static async getUserForCreateAdmin(query) {
        return {
            data: [
                {
                    id: 1,
                    email: 'maksat111@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 2,
                    email: 'maksat222@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 3,
                    email: 'maksat333@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 4,
                    email: 'maksat444@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 5,
                    email: 'maksat555@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
            ]
        };
    }

    static async getUserForAdminManagement(query) {
        return {
            data: [
                {
                    id: 1,
                    email: 'maksat111@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 2,
                    email: 'maksat222@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 3,
                    email: 'maksat333@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 4,
                    email: 'maksat444@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
                {
                    id: 5,
                    email: 'maksat555@gmail.com',
                    phoneNumber: "+7(705)100-10-10"
                },
            ]
        };
    }
}