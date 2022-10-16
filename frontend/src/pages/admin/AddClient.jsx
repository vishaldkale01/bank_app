import React , {useEffect , useState} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch  , useSelector } from 'react-redux'
import { add_client_action } from '../../action/adminAction'
export default function AddClient() {
  const dispatch = useDispatch()
  // const [B_name, setB_name] = useState()
  // const [b_branch, setb_branch] = useState()
  // const [acc, setacc] = useState()
  const [formData, setformData] = useState({
    B_name: "",
    b_branch: "",
    acc: "",
    // cpassword: ""
})
  const formik = useFormik({
  initialValues: {
    name : "",
    mobile : "",
    email : "",
    password : "",
    bank : {
      bank_name : "" ,
      branch : "", 
      account_balance : "", 
    },
    validationSchema: yup.object({
      name:
        yup
          .string()
          .required("name can not be empty"),
      email:
        yup
          .string()
          .email("this is not valid email address")
          .required("email can not be empty"),
      mobile:
        yup
          .string()
          .required("mobile can not be empty")
          .min(10, "enter valid mobile number").max(12, "enter valid mobile number"),
      password:
        yup
          .string()
          .required("password can not be empty")
          .min(3, "password can not be less than 3 charactors"),
    }),
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(add_client_action(values))
      console.log(values);
      resetForm()
    }
  })
  
  return (
    <div>

<div class="container">
                  <div class="row">
                    <div class="">
                      <div class="card">
                        <div class="card-header">Add new client</div>
                        <form onSubmit={formik.handleSubmit}>
                        <div class="card-body">
                          <div>
                            <input
                              type="text"
                              class="form-control"
                              id="name"
                              placeholder="name"
                              onChange={ formik.handleChange} 
                              value={formik.values.name}
                              error={formik?.errors?.name}
                            />
                          </div>
                          <div class="mt-2">
                            <input
                              type="text"
                              class="form-control"
                              id="mobile"
                              placeholder="mobile"
                              onChange={formik.handleChange} 
                              value={formik.values.mobile}
                            />
                          </div>
                          <div class="mt-2">
                            <input
                              type="text"
                              class="form-control"
                              id="email"
                              placeholder="email"
                              onChange={formik.handleChange} 
                              // value={formik.values.email}
                            />
                          </div>
                          <div class="mt-2">
                            <input
                              type="text"
                              class="form-control"
                              id="password"
                              placeholder="password"
                              onChange={ formik.handleChange} 
                              value={formik.values.password}
                            />
                          </div>
                          <div class="mt-2">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="bank_name"
                              id='bank_name'
                              onChange={formik.handleChange} 
                              value={formik.values.bank.bank_name}
                            />
                          </div>
                          <div class="mt-2">
                            <input
                              type="text"
                              class="form-control"
                              id="branch"
                              placeholder="branch"
                              onChange={ formik.handleChange} 
                              value={formik.values.bank.branch}
                            />
                          </div>
                          <div class="mt-2">
                            <input
                              type="text"
                              class="form-control"
                              id="account_balance"
                              placeholder="account_balance"
                              onChange={ formik.handleChange} 
                              value={formik.values.bank.account_balance}
                            />
                          </div>
                          <button type="submit" class="btn btn-primary w-100 mt-3">
                            Add
                          </button>
                          
                        </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>


    </div>
  )
}
