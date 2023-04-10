import axios from "../../api/axios";
import cookies from "js-cookie";

const IN_PROGRESS_URL = '/api/purchase/purchaseList';
const PURCHASE_STATUS = '/api/purchase/changeStatus';

const BOUGHT_HISTORY_URL = '/api/purchase/purchaseList';
const SOLD_HISTORY_URL = '/api/purchase/customerList';

const GET_USERS_URL = '/api/admin/getUserList';
const BAN_USER_URL = '/api/admin/blackListUser';

const GET_ADMINS_URL = '/api/superAdmin/getAdminList';
const MAKE_ADMIN_URL = '/api/superAdmin/addOrRemoveAdmin';

export default class UserService {
    static async getRequests() {
        return axios({
            method: 'get',
            url: IN_PROGRESS_URL,
            params: {
                status: 'PROCESSING'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => response.data.list);
    }

    static async getUser(query) {
        return axios({
            method: 'get',
            url: GET_USERS_URL,
            params: {
                email: query
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => response.data.list);
    }

    static async blockUser(email) {
        return axios({
            method: 'post',
            url: BAN_USER_URL,
            params: {
                email: email,
                lang: cookies.get('i18next') || 'en'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }

    static async unblockUser(email) {
        return axios({
            method: 'post',
            url: BAN_USER_URL,
            params: {
                email: email,
                lang: cookies.get('i18next') || 'en'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }

    static async makeAdmin(email) {
        return axios({
            method: 'post',
            url: MAKE_ADMIN_URL,
            params: {
                email: email
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
        return axios({
            method: 'get',
            url: GET_USERS_URL,
            params: {
                email: query
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.data.list)
            .then(response => response.filter(user => user.isBlackList === false));
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