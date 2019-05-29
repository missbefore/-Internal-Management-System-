import {connectReducers, connectReducersList} from "./index";
import {GET} from './http_curl'
import {dealReturnData} from './public'

export const searchResultList = (object) => (dispatch) => {
    switch (object.type) {
        case 'merchant':
            object.url = 'merchants/list'
            object.actionType = 'SEARCH_MERCHANT_LIST'
            break
        case 'schedules':
            object.url = 'merchants/schedules'
            object.actionType = 'DEAL_MERCHANT_SCHEDULES'
            if(JSON.stringify(object.options) === '{}') {
                object.options= {others: { status: "KYC,SECONDKYC,CONTRACT_0,OPENING_0,CONTRACT_1"}}
            }
            break
        case 'payment':
            object.url = 'payments/list'
            object.actionType = 'SEARCH_PAYMENT_LIST'
            break
        default:
            dispatch(connectReducers('ERROR_MODEL_ACTION', 'error', {title:'获取数据', message:'获取数据失败'}))
    }

   return  dealSearchAction(object, dispatch)
}


const dealSearchAction = (obj, dispatch) => {
    let search_options = obj.options
    let search_url = obj.url
    let type = obj.actionType
    let name = obj.name
    let data_name = obj.type

    let realOption = (search_options) => {
        if (search_options === {}) {
            return  {}
        }

        if (search_options.input !== undefined) {
            return search_options.input
        } else {
            return  search_options.others
        }
    }

    return GET('/'+search_url, realOption(search_options)).then(

        res => {
            if (res.data.msg === 'success') {
                let data = dealReturnData(res.data.data)
                dispatch(connectReducersList(type, data_name, data, search_options))
            }
        },
        error => {
            console.log(error)
            dispatch(connectReducers('ERROR_MODEL_ACTION', 'error',{'title':name, 'message':'获取' +name+ '失败'}))
        }
    )
}

export const getOptionsActions = (page_name) => (dispatch) =>{

    let search_url = page_name+'/options'
    let search_type = 'SHOW_'+page_name.toUpperCase()+'_OPTION'

    return GET('/'+search_url).then(
        res => {
            if (res.data.msg === 'success') {
                let data = dealReturnData(res.data.data)
                dispatch(connectReducers(search_type, "data", data))
            }
        },
        error => {
            console.log(error)
        }
    )
}

export const clearInputAction = () => (dispatch) => {
    dispatch(connectReducers('CLEAR_PAGE_INPUT'))
}

export const insertInputAction = (obj) => (dispatch) => {
    dispatch(dispatch(connectReducers('INSERT_INPUT_VALUE', 'input', obj)))
}

export const checkedBoxAction = (obj) => (dispatch) => {
    dispatch(dispatch(connectReducers('CHECK_BOX_VALUE', 'checked', obj)))
}