import axios from "axios";

export default class HttpServices{
    constructor () {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        });
    }

    post(url, data){
        return this.axios.post(url, data);
    }
}
