import axios from 'axios';

const BASE_URL = 'http://naturalgoods-env-1.eba-tugt88fn.eu-north-1.elasticbeanstalk.com/';

export default axios.create({
    baseURL: BASE_URL
});