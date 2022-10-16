import axios from "axios"
import { LOG_IN_FAIL, LOG_IN_REQUEST, LOG_IN_SUCCESS } from "../Constants/contants"
export const log_in_action =  (LOG_IN)=> async dispatch =>{
    try {
        dispatch({type : LOG_IN_REQUEST})
        const {data} = await axios.post("http://localhost:3001/admin/admin_log_in"  ,LOG_IN)
        dispatch({type : LOG_IN_SUCCESS , payload:data})
        console.log(data);
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({type : LOG_IN_FAIL , payload : error.response.data.message})}
}

export const log_in_client =  (LOG_IN)=> async dispatch =>{
    try {
        dispatch({type : LOG_IN_REQUEST})
        const {data} = await axios.post("http://localhost:3001/client/client_log_in"  ,LOG_IN)
        dispatch({type : LOG_IN_SUCCESS , payload:data})
        console.log(data);
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({type : LOG_IN_FAIL , payload : error.response.data.message})}
}