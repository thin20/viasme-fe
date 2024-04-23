import axios from '@/utils/request'
import api from '@/services/apiRouter.js'

export function login (params) {
    return axios({
        method: 'post',
        url: api.login,
        data: params
    })
}

export function register (params) {
    return axios({
        method: 'post',
        url: api.register,
        data: params
    })
}

export function loginByToken (token) {
    return axios({
        method: 'post',
        url: api.loginByToken,
        data: token
    })
}

export function updateUserInfo (params) {
    return axios({
        method: 'post',
        url: api.updateUserInfo,
        data: params
    })
}

export function changeAvatar (params) {
    return axios({
        method: 'post',
        url: api.changeAvatar,
        data: params
    })
}

export function changePassword (params) {
    return axios({
        method: 'put',
        url: api.changePassword,
        data: params
    })
}

export function genCaptcha (params) {
    return axios({
        method: 'get',
        url: api.genCaptcha,
        data: params
    })
}
