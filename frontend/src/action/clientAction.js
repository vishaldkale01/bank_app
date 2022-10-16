import axios from "axios"
import { GET_CLIENT_FAIL, GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS, GET_PRODILE_REQUEST, GET_PRODILE_SUCCESS, LOG_IN_FAIL, LOG_IN_REQUEST, LOG_IN_SUCCESS, TRANSFER_MONEY_FAIL, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS, UPDATE_CLIENT_FAIL, UPDATE_CLIENT_REQUEST, UPDATE_CLIENT_SUCCESS } from "../Constants/contants"

// export const get_all_client_Action =  ()=> async dispatch =>{
//     try {
//         dispatch({type : GET_CLIENT_REQUEST})
//         console.log("client");
//         const {data} = await axios.get("http://localhost:3001/admin/client_Record")
//         dispatch({type : GET_CLIENT_SUCCESS , payload:data.data})
//     } catch (error) {
//         dispatch({type : GET_CLIENT_FAIL , payload : error.response.data.message})}
// }

    
// } catch (error) {
    
// }
// }
export const log_in_action_client =  (LOG_IN)=> async dispatch =>{
    try {
        dispatch({type : LOG_IN_REQUEST})
        const {data} = await axios.post("http://localhost:3001/client/client_log_in",LOG_IN)
        dispatch({type : LOG_IN_SUCCESS , payload:data})
        console.log(data);
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({type : LOG_IN_FAIL , payload : error.response.data.message})}
}

export const update_profie = (update_profie) => async dispatch =>{   
        try {
            dispatch({type : UPDATE_CLIENT_REQUEST})
            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDdhNGY1M2QwNmY5Yzk3NzliODE1YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NTgzNzExMX0.gdoME_yhy2ylCoNtfPxcgSenbmEGp_3hgL_yJ9OiXVE"
            const token = localStorage.getItem("token")
            const {data} = await axios.put("http://localhost:3001/client/update_Account",update_profie,
            {headers : {"Authorization": `Bearer ${token}`}}
            )
            console.log(data);
            dispatch({type : UPDATE_CLIENT_SUCCESS , payload : data})
        } catch (error) {
            dispatch({type : UPDATE_CLIENT_FAIL , payload : error })
        }
    }
    
    export const Profile_details =  ()=> async dispatch =>{
        try {
            dispatch({type : GET_PRODILE_REQUEST})
            console.log("client");
            const token = localStorage.getItem("token")
            const {data} = await axios.get("http://localhost:3001/client/get_client",
            {headers : {"Authorization": `Bearer ${token}`}}
            )
            dispatch({type : GET_PRODILE_SUCCESS , payload:data.data})
        } catch (error) {
            dispatch({type : GET_CLIENT_FAIL , payload : error.response.data.message})}
    }
    export const Payment_history =  ()=> async dispatch =>{
        try {
            dispatch({type : GET_CLIENT_REQUEST})
            console.log("client");
            const token = localStorage.getItem("token")
            const {data} = await axios.get("http://localhost:3001/client/transactions",
            {headers : {"Authorization": `Bearer ${token}`}}
            )
            dispatch({type : GET_CLIENT_SUCCESS , payload:data.data})
        } catch (error) {
            dispatch({type : GET_CLIENT_FAIL , payload : error.response.data.message})}
    }
// transfer money
    export const Transfer_mondy =  (MONEY)=> async dispatch =>{
        try {
            dispatch({type : TRANSFER_MONEY_REQUEST})
            console.log("client");
            const token = localStorage.getItem("token")
            const {data} = await axios.post("http://localhost:3001/client/transfer_money",MONEY,
            {headers : {"Authorization": `Bearer ${token}`}}
            )
            dispatch({type : TRANSFER_MONEY_SUCCESS , payload:data.data})
        } catch (error) {
            dispatch({type : TRANSFER_MONEY_FAIL , payload : error.response.data.message})}
    }