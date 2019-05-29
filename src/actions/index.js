export const connectReducers = (type, name, data) => ({
    'type': type,
    [name]: data
})

export const connectReducersList = (type, name, data, option) => ({
    'type': type,
    [name]: data,
    option: option
})

//search公共
export const CLEAR_PAGE_INPUT = 'CLEAR_PAGE_INPUT'
export const INSERT_INPUT_VALUE = 'INSERT_INPUT_VALUE'
//common 和 public 模块type属性
export const LOGIN_IN_SYSTEM = 'LOGIN_IN_SYSTEM'
export const SAVE_NEXT_URL = 'SAVE_NEXT_URL'
export const MENU_STATE_LIST = 'MENU_STATE_LIST'
export const MENU_THEME_CHANGE = 'MENU_THEME_CHANGE'
export const OPEN_DRAW_FORM = 'OPEN_DRAW_FORM'
export const CLOSE_DRAW_FORM = 'CLOSE_DRAW_FORM'
export const MOVE_TO_NEXT = 'MOVE_TO_NEXT'

//message
export const ERROR_MODEL_ACTION = 'ERROR_MODEL_ACTION'
export const SUCCESS_MODEL_ACTION = 'SUCCESS_MODEL_ACTION'
export const CLEAR_ERROR_STATE = 'CLEAR_ERROR_STATE'
export const CLEAR_SUCCESS_STATE = 'CLEAR_SUCCESS_STATE'


//merchant商户部分action
export const SEARCH_MERCHANT_LIST = 'SEARCH_MERCHANT_LIST'
export const SHOW_MERCHANTS_OPTION = 'SHOW_MERCHANTS_OPTION'


//schedule
export const DEAL_MERCHANT_SCHEDULES = 'DEAL_MERCHANT_SCHEDULES'
export const CHECK_BOX_VALUE = 'CHECK_BOX_VALUE'
