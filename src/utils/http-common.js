import axios from 'axios';

export default axios.create({
    baseURL: `${process.env.DEV_URL}`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
});