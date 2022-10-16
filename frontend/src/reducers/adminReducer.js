import { 
    LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAIL, GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS, GET_CLIENT_FAIL
} from "../Constants/contants";

// export const taskReducers = (state ={task : []} , {type , payload} )=>{
//     switch (type) {
//         case ADD_TASK_REQUEST : return {...state , isLoading : true}
//         case ADD_TASK_SUCCESS : return {isLoading : false , task : payload}
//         case ADD_TASK_FAIL : return {isLoading : false , error : payload}
//         default: return state           
//     }
// }
export const Get_all_Client = (state ={ALL_CLIENT : [] , CLIENT_ERRRO : []} , {type , payload} )=>{
    switch (type) {
        case GET_CLIENT_REQUEST : return {...state , isLoading : true}
        case GET_CLIENT_SUCCESS : return {isLoading : false , ALL_CLIENT   : payload}
        case GET_CLIENT_FAIL : return {isLoading : false , CLIENT_ERRRO : payload}
        default: return state           
    }
}   

export const create_client_reducer = (state ={log_in_admin : []} , {type , payload} )=>{
    switch (type) {
        case LOG_IN_REQUEST : return {...state , isLoading : true}
        case LOG_IN_SUCCESS : return {isLoading : false , log_in_admin   : payload}
        case LOG_IN_FAIL : return {isLoading : false , log_in_admin : payload}
        default: return state           
    }
}
