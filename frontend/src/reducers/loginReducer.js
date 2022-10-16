import { 
    LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAIL
} from "../Constants/contants";

export const log_inReducer = (state ={LOG_IN : [] , error_message : []} , {type , payload} )=>{
    switch (type) {
        case LOG_IN_REQUEST : return {...state , isLoading : true}
        case LOG_IN_SUCCESS : return {isLoading : false , LOG_IN   : payload}
        case LOG_IN_FAIL : return {isLoading : false , error_message : payload}
        default: return state           
    }
}