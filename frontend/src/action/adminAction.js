import axios from "axios"
import { ADD_CLIENT_FAIL, ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, GET_CLIENT_FAIL, GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS, LOG_IN_FAIL, LOG_IN_REQUEST, LOG_IN_SUCCESS, UPDATE_CLIENT_FAIL, UPDATE_CLIENT_REQUEST, UPDATE_CLIENT_SUCCESS } from "../Constants/contants"

// export const taskAction = ({title : task,
//     desc : desc,
//     priority : priority}) => async dispatch =>{
//     try {
//         dispatch({type : ADD_TASK_REQUEST})
//         const {data} = await axios.post("http://localhost:5000/api/Todo",{title : task,
//         desc : desc,
//         priority : priority})
//         dispatch({type : ADD_TASK_SUCCESS , payload : data})
//     } catch (error) {
//         dispatch({type : ADD_TASK_FAIL , payload: error})
//     }
// }

export const get_all_client_Action =  ()=> async dispatch =>{
    try {
        dispatch({type : GET_CLIENT_REQUEST})
        console.log("client");
        const {data} = await axios.get("http://localhost:3001/admin/client_Record")
        dispatch({type : GET_CLIENT_SUCCESS , payload:data.data})
    } catch (error) {
        dispatch({type : GET_CLIENT_FAIL , payload : error.response.data.message})}
}

export const update_client_action = (update_client) => async dispatch =>{
try {   
    try {
        dispatch({type : UPDATE_CLIENT_REQUEST})
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDdhNGY1M2QwNmY5Yzk3NzliODE1YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NTgzNzExMX0.gdoME_yhy2ylCoNtfPxcgSenbmEGp_3hgL_yJ9OiXVE"
        const {data} = await axios.put("http://localhost:3001/admin/update_client",update_client,
        {headers : {"Authorization": `Bearer ${token}`}}
        )
        console.log(data);
        dispatch({type : UPDATE_CLIENT_SUCCESS , payload : data})
    } catch (error) {
        dispatch({type : UPDATE_CLIENT_FAIL , payload : error })
    }
    
} catch (error) {
    
}
}

export const add_client_action = (new_client) => async dispatch =>{
    try {   
        try {
            dispatch({type : ADD_CLIENT_REQUEST})
            // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDdhNGY1M2QwNmY5Yzk3NzliODE1YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NTgzNzExMX0.gdoME_yhy2ylCoNtfPxcgSenbmEGp_3hgL_yJ9OiXVE"
            const token = localStorage.getItem("token")
            const {data} = await axios.post("http://localhost:3001/admin/add_client",new_client,
            {headers : {"Authorization": `Bearer ${token}`}}
            )
            console.log(data);
            dispatch({type : ADD_CLIENT_SUCCESS , payload : data})
        } catch (error) {
            dispatch({type : ADD_CLIENT_FAIL , payload : error })
        }
        
    } catch (error) {
        
    }
}