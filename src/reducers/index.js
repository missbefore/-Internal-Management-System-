import { combineReducers } from 'redux'

import {CommonReducer} from './common'
import {MessageReducer} from './message'
import {MerchantReducer} from './merchant'
import {ScheduleReducer} from "./schedule";

const rootReducer = combineReducers({
   common:CommonReducer,
   message:MessageReducer,
   merchant: MerchantReducer,
   schedule: ScheduleReducer
})

export default rootReducer