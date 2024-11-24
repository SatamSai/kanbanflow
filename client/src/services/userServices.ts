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

    googleLogin = (data: Object) => {
        return this.makeAPICall(`/users/google-login`, 'POST', data)
    }

    logoutUser = () => {
        return this.makeAPICall(`/users/logout`, 'POST')
    }

}


const userService = new UserServices()

export default userService