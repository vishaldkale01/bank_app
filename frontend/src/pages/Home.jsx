import React from 'react'
import { useDispatch  , useSelector } from 'react-redux'
import { useState } from 'react'
import { json, Link , useNavigate } from 'react-router-dom'
// import { log_in_action } from '../action/loginAction/'
import {log_in_action} from "../action/loginAction"
import { get_all_client_Action } from '../action/adminAction'
import { log_in_action_client, Payment_history } from '../action/clientAction'

// import Admin from './admin/Admin'

export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {LOG_IN} = useSelector(state => state.LOG_IN)
  const {error_message} = useSelector(state => state.error_message)
  const {CLIENT_ERRRO} = useSelector(state => state.CLIENT_ERRRO)
  const {ALL_CLIENT} = useSelector(state => state.ALL_CLIENT)

  const [role, setrole] = useState("admin")

  const [email, setemail] = useState("vishaldkale0@gmail.com")
    const [password, setpassword] = useState("123")
    const handleSignUp = async () => {
      // console.log(error);
     try {
      if (role == "admin") {
        dispatch(log_in_action({email , password}))
        localStorage.setItem("token",(LOG_IN.data.token))
        
        // setTimeout( 
        navigate("Admin")
        // 3000)
        setTimeout(() => {
          dispatch(get_all_client_Action())
        }, 3000);
        // all_client()
      } else{
        dispatch(log_in_action_client({email , password}))
        localStorage.setItem("token",(LOG_IN.data.token))
          navigate("Client")
          setTimeout(() => {
            dispatch(Payment_history())
          }, 3000);
        console.log(LOG_IN,"LOG_IN");
      }

    //  console.log(LOG_IN.data.token,"log_in_admin");
    //  navigate("Admin")
    // navigate("Client")
     } catch (error) {
      console.log(error);
      function myFunction() {
        alert(error_message);
        }
      myFunction()
     }  
    }
  return (
    <div className='container mt-5 '>
        <h1 className='text-center mt-5'>Welocome</h1>
        <div class="container">
              <form action="">
              <div class="row">
                <div class="col-sm-6 offset-sm-3">
                  <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                      <div>
                        <label for="email" class="form-label">First Email</label>
                        <input
                          type="text"
                          class="form-control"
                          id="email"
                          placeholder="Enter Your Email"
                          onChange={e=> setemail(e.target.value)}
                        />
                      </div>
                      <div class="mt-2">
                        <label for="password" class="form-label">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          placeholder="Enter Your Password"
                          onChange={e=> setpassword(e.target.value)}
                        />

                      </div>
                      <div class="mt-2">
                      <label htmlFor="form-label">Role</label>
                          <select class="form-select mt-2" onChange={e=> setrole(e.target.value)}>
                            <option value="admin">admin</option>
                            <option value="client">client</option>
                            {/* <option value="3">Three</option> */}
                          </select>
                          </div>
                      <button type="button" class="btn btn-primary w-100 mt-3" onClick={handleSignUp}>
                      <Link className='nav-link' to={"/"}>log in</Link>
                      </button>

                    </div>
                  </div>
                </div>
              </div>
              </form>
            </div>
    </div>
  )
}
