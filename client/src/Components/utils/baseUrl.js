import axios from 'axios'

const url = "http://localhost:3001/api/"

const baseUrl = axios.create({
    baseURL: url
});

export default baseUrl;