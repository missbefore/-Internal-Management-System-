import Axios from 'axios';
import qs from 'qs'
import Cookies from 'js-cookie'
import {clearTokenLogout} from './public'
Axios.defaults.baseURL='http://do.com:8060/';
Axios.defaults.withCredentials = false


Axios.interceptors.request.use(config=>{
    let  token = Cookies.get('token')
    if (token) {
        config.headers.Authorization = token;
    }
    return config
})

export const GET = (url, param) => {
    let params = {}
    params.params = param===undefined?{}:param

    return new Promise((resolve, reject)=> {
        Axios.get(url, params)
            .then(function (response) {
                if (response.data.errorCode !== undefined) {
                    clearTokenLogout(response.data.errorCode)
                }
                resolve(response)
            }).catch(function (error) {
            reject(error)
        })
    })
}

export const POST = (url, param={}) => {
    return new Promise((resolve, reject)=> {
        Axios.post(url, qs.stringify(param))
            .then(function (response) {
                if (response.data.errorCode !== undefined) {
                    clearTokenLogout(response.data.data.errorCode)
                }
                resolve(response)
            }).catch(function (error) {
            reject(error)
        })
    })

}

export const PUT = (url, param={}) => {
    Axios.put(url, param)
        .then(function (response) {
            if (response.data.errorCode !== undefined) {
                clearTokenLogout(response.data.data.errorCode)
            }
            return response
        }).cache(function (error) {
        console.log(error)
    })
}

export const DELETE = (url, param={}) => {
    Axios.delete(url, param)
        .then(function (response) {
            if (response.data.errorCode !== undefined) {
                clearTokenLogout(response.data.data.errorCode)
            }
            return response
        }).cache(function (error) {
        console.log(error)
    })
}