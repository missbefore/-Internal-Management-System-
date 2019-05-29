import {
    ERROR_MODEL_ACTION,
    SUCCESS_MODEL_ACTION,
    CLEAR_ERROR_STATE,
    CLEAR_SUCCESS_STATE
} from '../actions/index'
import cloneDeep from 'lodash/cloneDeep'

const initialState = {
    errorMessage:{},
    successMessage: {}
}

export const MessageReducer = (state = initialState, action) => {
    switch(action.type) {
        case ERROR_MODEL_ACTION:
            return   {
                ...state,
                errorMessage: action.error
            }

        case SUCCESS_MODEL_ACTION:
            return  {
                ...state,
                successMessage: action.success,
            }
        case CLEAR_ERROR_STATE:
            let newError = cloneDeep(state.errorMessage)
            newError = {}
            return newError
        case CLEAR_SUCCESS_STATE:
            let successError = cloneDeep(state.successMessage)
            successError = {}
            return successError
        default:
            return state
    }
}