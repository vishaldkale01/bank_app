import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch  , useSelector } from 'react-redux'
import { Profile_details, update_profie } from '../../action/clientAction';

export default function () {
  const dispatch = useDispatch()
  const {PROFILE_DETAILS} = useSelector(state => state.PROFILE_DETAILS)
    const formik = useFormik({
        initialValues: {
      name : "",
      email : "",
      mobile : "",
      // password : "",    
      },
        onSubmit: async (values, { resetForm }) => {
          dispatch(update_profie(values))
          console.log(values,"hhhh");
          resetForm()
        }
      })
  return (
    <div>
    
          {/* {JSON.stringify(PROFILE_DETAILS)}/ */}
              
          <div class="card">
            <div class="card-body">
              <div className="table-responsive">
              <table className="table table-dark">
                <thead>
                  <tr>
                   <th> Name</th>
                   <th> mobile</th>
                   <th> email</th>
                   <th> admin_id</th>
                   <th> bank</th>
                   <th> branch</th>
                   <th> balance </th>  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>{PROFILE_DETAILS.name}</td> 
                  <td>{PROFILE_DETAILS.mobile}</td> 
                  <td>{PROFILE_DETAILS.email}</td> 
                  <td>{PROFILE_DETAILS.admin_id}</td>
                  <td> {PROFILE_DETAILS?.bank?.bank_name}</td>
                  <td> {PROFILE_DETAILS?.bank?.branch}</td>
                  <td> {PROFILE_DETAILS?.banl?.account_balance}</td>   
                  </tr>
                </tbody>
              </table>
              </div>
              
            </div>
          </div>
              <form onSubmit={formik.handleSubmit}>
      <div class="modal-body">
      
      <div>
            <label for="name" className="form-label">Name</label>
            <input type="text" class="form-control" id="name" placeholder={PROFILE_DETAILS.name} onChange={ formik.handleChange} value={formik.values.name} />
            <label for="email" className="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder={PROFILE_DETAILS.email} onChange={ formik.handleChange} value={formik.values.email} />
            <label for="email" className="form-label">mobile</label>
            <input type="text" class="form-control" id="mobile" placeholder={PROFILE_DETAILS.mobile} onChange={ formik.handleChange} value={formik.values.mobile} />
            <label for="email" className="form-label">password</label>
            {/* <input type="text" class="form-control" id="password" placeholder={formik.values.password} onChange={ formik.handleChange} value={formik.values.password} /> */}
            {/* <input type="text" class="form-control" id="account_balance" onChange={ e=> setupdate(e.target.value)} value={update.account_balance}/> */}
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">update</button>
      </div>
      </form>

    </div>
  )
}
