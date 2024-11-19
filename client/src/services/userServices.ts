import BaseApiService from "./baseApiService";


class UserServices extends BaseApiService {

    checkToken = () => {
        return this.makeAPICall(`/users/check-token`, 'GET')
    }

    submitUserInfo = (data: Object) => {
        return this.makeAPICall(`/users/submitInfo`, 'POST', data)
    }

    registerUser = (data: Object) => {
        return this.makeAPICall(`/users/register`, 'POST', data, {}, false)
    }

    loginUser = (data: Object) => {
        return this.makeAPICall(`/users/login`, 'POST', data)
    }

}


const userService = new UserServices()

export default userService