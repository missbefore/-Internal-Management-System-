import {
    SEARCH_MERCHANT_LIST,
    SHOW_MERCHANTS_OPTION,
    CLEAR_PAGE_INPUT,
    INSERT_INPUT_VALUE
} from '../actions/index'


const initialState = {
    data: {},
    option: {},
    optionData:{},
    input:{merchant_info:'', wx_merchant_id:''}
}

export const MerchantReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_MERCHANT_LIST:
            return {
                ...state,
                data : action.merchant,
                option: action.option,
            }
        case SHOW_MERCHANTS_OPTION:
            return {
                ...state,
                optionData:action.data
            }
        case INSERT_INPUT_VALUE:
            return {
                ...state,
                input: action.input
            }
        case CLEAR_PAGE_INPUT :
            return {
                ...state,
                input:{merchant_info:'', wx_merchant_id:''}
            }
        default:
            return state
    }
}