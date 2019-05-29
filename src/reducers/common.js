import {
    LOGIN_IN_SYSTEM,
    SAVE_NEXT_URL,
    MENU_STATE_LIST,
    MENU_THEME_CHANGE,
    OPEN_DRAW_FORM,
    CLOSE_DRAW_FORM,
    MOVE_TO_NEXT
} from '../actions/index'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const initialState = {
    nextUrl: '',
    isLogin : {},
    collapsed: false,
    theme:'light',
    visibleHeader:false,
}

export const CommonReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_IN_SYSTEM:
            return   {
                ...state,
                isLogin : action.isLogin,
            }
        case SAVE_NEXT_URL:
            return  merge(state, state.nextUrl, action.nextUrl)
        case MENU_THEME_CHANGE:
            let newState_theme = cloneDeep(state)
            newState_theme.theme = state.theme ==='light'?'dark':'light'
            return  newState_theme
        case MENU_STATE_LIST:
            let newState_collapsed = cloneDeep(state)
            newState_collapsed.collapsed = !state.collapsed
            return newState_collapsed
        case OPEN_DRAW_FORM:
            let newState_draw = cloneDeep(state)
            newState_draw.visibleHeader = !state.visibleHeader
            return newState_draw
        case CLOSE_DRAW_FORM:
            let newState_draw_close = cloneDeep(state)
            newState_draw_close.visibleHeader = false
            return newState_draw_close
        case MOVE_TO_NEXT:
            return   {
                ...state,
                nextUrl : action.url,
            }
        default:
            return state
    }
}