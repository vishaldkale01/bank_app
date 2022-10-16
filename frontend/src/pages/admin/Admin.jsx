import React ,{ useEffect , useState} from 'react'
import { json } from 'react-router-dom'
import { useDispatch  , useSelector } from 'react-redux'
import { update_client_action } from '../../action/adminAction'
import { useFormik } from "formik";
import * as yup from "yup";
import {  useNavigate } from 'react-router-dom'
import AddClient from './AddClient';
export default function Admin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {CLIENT_ERRRO} = useSelector(state => state.CLIENT_ERRRO)
  const {ALL_CLIENT} = useSelector(state => state.ALL_CLIENT)
  const [client_id, setclient_id] = useState()
  const [update, setupdate] = useState({
client_id : client_id,
name : "",
email : "",
mobile : "",
bank_name : "",
branch : "",
account_balance : "",  })

// usefrormik


const formik = useFormik({
  initialValues: {
client_id : "",
name : "",
email : "",
mobile : "",
bank_name : "",
branch : "",
account_balance : "",
  },
  
  onSubmit: async (values, { resetForm }) => {
    dispatch(update_client_action(values))
    console.log(values);
    resetForm()
  }
})
const logout = ()=>{
  try {
    localStorage.removeItem("token")
    navigate("/")
  } catch (error) {
    
  }
}
 //stop
  useEffect(() => {
  console.log(ALL_CLIENT);
// console.log(Client_id);
  
}, [])

    return (
    <div className='container'>
  <div class="card">
    <div class="card-header text-center">Admin</div>
    <div class="card-body">
    <div className=''>
        <div className='text-centere'>
        
        {/* <button type="button" class="btn btn-info w-50" data-bs-toggle="modal" data-bs-target="#Update_Profile">Update_Profile</button> */}
        <button type="button" class="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#Add_client">add New Client</button>
        {/* <button type="button" class="btn btn-danger w-50" data-bs-toggle="modal" data-bs-target="#sent_money"> sent Money</button> */}
        </div>
        <h1 className='text-center text-success'>Client</h1>
        <table class="table table-dark table-striped table-hover text-center">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">mobile</th>
              <th scope="col">bank_name</th>
              <th scope="col">branch</th>
              <th scope="col">account_balance</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
          {
            ALL_CLIENT.map((item , index)=>{
              {/* <th scope="row">1</th> */}
            return <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.bank.bank_name}</td>
              <td>{item.bank.branch}</td>
              <td>{item.bank.account_balance}</td>
              <td><button type="button"  class="btn btn-success" onClick={e => {
                
              formik.values.name = item.name 
              formik.values.client_id = item._id
              formik.values.email = item.email 
              formik.values.mobile = item.mobile 
              formik.values.bank_name = item.bank.bank_name 
              formik.values.branch = item.bank.branch
              formik.values.account_balance = item.bank.account_balance
              }} data-bs-toggle="modal" data-bs-target="#Update_Profile"  >update</button></td>
          </tr>
            })
          }
          </tbody>
        </table>
    </div>
    {/*  update profile */}
    <div class="modal fade" id="Update_Profile" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitleId">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={formik.handleSubmit}>
      <div class="modal-body">
      <div>
            <label for="name" className="form-label">Name</label>
            <input type="text" class="form-control" id="name" placeholder={formik.values.name} onChange={ formik.handleChange} value={formik.values.name} />
            <label for="email" className="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder={formik.values.email} onChange={ formik.handleChange} value={formik.values.email} />
            <label for="email" className="form-label">mobile</label>
            <input type="text" class="form-control" id="mobile" placeholder={formik.values.mobile} onChange={ formik.handleChange} value={formik.values.mobile} />
            <label for="email" className="form-label">bank_name</label>
            <input type="text" class="form-control" id="bank_name" placeholder={formik.values.bank_name} onChange={ formik.handleChange} value={formik.values.bank_name} />
            <label for="email" className="form-label">branch</label>
            <input type="text" class="form-control" id="branch" placeholder={formik.values.branch} onChange={ formik.handleChange} value={formik.values.branch} />
            <label for="email" className="form-label">account_balance</label>
            {/* <input type="text" class="form-control" id="account_balance" onChange={ e=> setupdate(e.target.value)} value={update.account_balance}/> */}
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">update</button>
      </div>
      </form>
      
    </div>
  </div>
</div>

      {/* create client */}
      <div class="modal fade" id="Add_client" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitleId">new Client</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <AddClient/>
      </div>
      
    </div>
  </div>
</div>

    </div>
    <div class="card-footer text-right"><button type="button" class="btn btn-success" onClick={logout}>logOut</button></div>
  </div>

</div>
  )
}
