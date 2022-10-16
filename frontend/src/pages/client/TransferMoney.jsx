import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Transfer_mondy } from '../../action/clientAction'
export default function TransferMoney () {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      account_number: '',
      bank_name: '',
      branch: '',
      amount: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(Transfer_mondy(values))
        console.log(values)
        resetForm()
      } catch (error) {
        console.log(error)
        function myFunction () {
          alert(error)
        }
        myFunction()
      }
    }
  })
  return (
    <div>
      <div className='card' style={{ width: '30rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>Welcome</h5>
          <h6 className='card-subtitle mb-2 text-muted'>transfer Money</h6>
          <p className='card-text'>
            <div>
              <div class='container'>
                <div class='row'>
                  <div class='col-sm-12 '>
                    <div class='card'>
                      <form action='' onSubmit={formik.handleSubmit}>
                        <div class='card-body'>
                          <div>
                            <label for='name' class='form-label'>
                              Account Number
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='account_number'
                              onChange={formik.handleChange}
                              value={formik.values.account_number}
                            />
                          </div>
                          <div class='mt-2'>
                            <label for='email' class='form-label'>
                              Bank Name
                            </label>
                            <select
                              class='form-select'
                              onChange={formik.handleChange}
                              value={formik.values.bank_name}
                            >
                              <option value='icici'>icici</option>
                              <option value='hdfc'> hdfc</option>
                              <option value='sbi'> sbi</option>
                              <option value='kotak'>kotak</option>
                            </select>
                          </div>
                          <div class='mt-2'>
                            <label for='password' class='form-label'>
                              Branch
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='branch'
                              onChange={formik.handleChange}
                              value={formik.values.branch}
                            />
                          </div>
                          <div class='mt-2'>
                            <label for='cpassword' class='form-label'>
                              Amount
                            </label>
                            <input
                              type='text'
                              class='form-control'
                              id='amount'
                              onChange={formik.handleChange}
                              value={formik.values.amount}
                            />
                          </div>
                          <button
                            type='submit'
                            class='btn btn-danger w-100 mt-3'
                          >
                            Transfer
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  )
}
