import axios from 'axios';

export default axios.create({
    baseURL: 'https://csci-409-testing-default-rtdb.firebaseio.com/'
});