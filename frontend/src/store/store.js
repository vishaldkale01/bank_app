import {createStore , combineReducers , applyMiddleware} from "redux"

import {composeWithDevTools} from "redux-devtools-extension"

import thunk from "redux-thunk"
import { Get_all_Client } from "../reducers/adminReducer"
import { Get_profile, Get_transatction } from "../reducers/clientReducer"
import { log_inReducer } from "../reducers/loginReducer"
// import { getTAskReducer, taskReducers } from "./Reducers/taskReducers"

// const localGetData = localStorage.getItem("data")
// ? JSON.parse(localStorage.getItem("data"))
// : []

const rootReducer = combineReducers({
    // task : taskReducers,
    // getTask : getTAskReducer,
    // log_in_admin : admin_log_in_reducer,
    LOG_IN : log_inReducer,
    error_message : log_inReducer,
    CLIENT_ERRRO : Get_all_Client , 
    ALL_CLIENT : Get_all_Client,
    PROFILE_ERRRO : Get_profile,
    PROFILE_DETAILS : Get_profile,
    TRASACTIONS_DETAILS : Get_transatction,
})
 const initialState = {
    // getTask : {getTask : localGetData}
    
} 
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
export default store