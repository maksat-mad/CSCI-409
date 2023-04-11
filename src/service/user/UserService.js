import axios from "../../api/axios";

const IN_PROGRESS_URL = '/api/purchase/customerList';
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
                email: email
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
                email: email
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

    static async removeFromAdmin(email) {
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
        return axios({
            method: 'get',
            url: GET_ADMINS_URL,
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
}