import {connectReducers} from "./index";
import Cookies from 'js-cookie'
import {store} from '../index'

export const nextUrl = (url) => (dispatch) => {
    dispatch(connectReducers('SAVE_NEXT_URL', 'nextUrl', url))
}

export const toggleCollapsedAction = () =>(dispatch) => {
    dispatch(connectReducers('MENU_STATE_LIST', 'collapsed', true))
}

export const changeThemeAction = () =>(dispatch) => {
    dispatch(connectReducers('MENU_THEME_CHANGE', 'theme', true))
}

export const showDrawerAction = () => (dispatch) => {
    dispatch(connectReducers('OPEN_DRAW_FORM'), 'visible', true)
}

export const onCloseHeaderAction = () => (dispatch) => {
    dispatch(connectReducers('CLOSE_DRAW_FORM'), 'visible', false)
}

export const renovateErrorState = () =>dispatch => {
    dispatch(connectReducers('CLEAR_ERROR_STATE', 'error', {}))
}

export const renovateSuccessState = () =>dispatch => {
    dispatch(connectReducers('CLEAR_SUCCESS_STATE', 'success', {}))
}


export const dealReturnData = (data) => {
    let returnData
    if (data !== undefined && data !== "") {
        returnData = data
    } else {
        returnData = {}
    }
    return  returnData
}

export const clearTokenLogout = (token_status) => {
    if (token_status===10001) {
        Cookies.remove('token')
        localStorage.clear()
        store.dispatch(connectReducers('MOVE_TO_NEXT', 'url', '/'))
        store.dispatch(connectReducers('ERROR_MODEL_ACTION', 'error',
            {title:'token过期', message:'token过期请重新登录'}))
    }
}