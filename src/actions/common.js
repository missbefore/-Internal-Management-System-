import {connectReducers} from "./index";
import { POST } from './http_curl'
import Cookies from 'js-cookie'


export const loginInAction = obj => dispatch =>{

    let request_data = {'username':obj.userName, 'password':obj.password}
    return POST('/login', request_data).then(

        res => {
            if (res.data.msg === 'success') {
                getNeedUrlKey()
                localStorage.setItem('login_user_info', JSON.stringify(res.data.data))
                localStorage.setItem('is_login', 'true')
                dispatch(connectReducers('SUCCESS_MODEL_ACTION', 'success', {'title':'登陆状态', 'message':'登陆成功'}))
            } else {
                dispatch(connectReducers('ERROR_MODEL_ACTION', 'error', {title:'登陆错误', message:res.data.msg}))
            }
        },

        error => {
            console.log(error)
            ///dispatch(connectReducers('ERROR_MODEL_ACTION', 'error', '发生未知错误'))
        }
    )
}

export const changeAdminPassword = obj => dispatch => {
    let request_data = {'username':obj.userName, 'password':obj.password}
    return POST('/changePassword.php', request_data).then(

        res => {
            if (res.data.msg === 'success') {
                dispatch(connectReducers('SUCCESS_MODEL_ACTION', 'success',{'title':'修改密码', 'message':'修改成功'}))
            }
        },

        error => {
            console.log(error)
            dispatch(connectReducers('ERROR_MODEL_ACTION', 'error',{'title':'修改密码', 'message':'修改密码错误'}))
        }
    )
}

const getNeedUrlKey = () => {
     POST('/auth').then(
        res => {
            if (res.data.msg === 'success') {
                Cookies.set('token', res.data.data)
            }
        },
        error => {
            console.log(error)

        }
    )
}