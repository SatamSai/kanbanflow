import axios from "axios"

const BASE_URL = import.meta.env.VITE_BACKEND_URL


export default class BaseApiService {
    makeAPICall = (url: string, method: string, data: Object = {}, params: Object = {}, withCredentials: boolean = true, timeout: number = 10000) => {
        return axios.request({
            url: BASE_URL + url,
            method,
            data,
            params,
            withCredentials,
            timeout,
        })
    }
}