import { GET_CLIENT_FAIL, GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS, GET_PRODILE_FAIL, GET_PRODILE_REQUEST, GET_PRODILE_SUCCESS } from "../Constants/contants"

export const Get_profile = (state ={PROFILE_DETAILS : [] , PROFILE_ERRRO : []} , {type , payload} )=>{
    switch (type) {
        case GET_PRODILE_REQUEST : return {...state , isLoading : true}
        case GET_PRODILE_SUCCESS : return {isLoading : false , PROFILE_DETAILS   : payload}
        case GET_PRODILE_FAIL : return {isLoading : false , PROFILE_ERRRO : payload}
        default: return state           
    }
}

export const Get_transatction = (state ={TRASACTIONS_DETAILS : [] , TRASACTIONS_ERRRO : []} , {type , payload} )=>{
    switch (type) {
        case GET_CLIENT_REQUEST : return {...state , isLoading : true}
        case GET_CLIENT_SUCCESS : return {isLoading : false , TRASACTIONS_DETAILS   : payload}
        case GET_CLIENT_FAIL : return {isLoading : false , PROFILE_ERRRO : payload}
        default: return state           
    }
}