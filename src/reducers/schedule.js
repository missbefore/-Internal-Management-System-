import {
    DEAL_MERCHANT_SCHEDULES, CHECK_BOX_VALUE,
} from '../actions/index'


const initialState = {
    data: {},
    checked:['KYC', 'SECONDKYC', 'CONTRACT_0', 'CONTRACT_1', 'OPENING_0']
}

export const ScheduleReducer = (state = initialState, action) => {
    switch(action.type) {
        case DEAL_MERCHANT_SCHEDULES:
            return {
                ...state,
                data: action.schedules,
            }
        case CHECK_BOX_VALUE:
            return {
                ...state,
                checked: action.checked,
            }
        default:
            return state
    }
}