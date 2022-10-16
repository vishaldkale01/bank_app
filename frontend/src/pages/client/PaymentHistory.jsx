import React from 'react'
import { useDispatch  , useSelector } from 'react-redux'

export default function PaymentHistory() {
    const {TRASACTIONS_DETAILS} = useSelector(state => state.TRASACTIONS_DETAILS)
  return (
    <div className='container'>
        <table class="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">account_number</th>
              <th scope="col">bank_name</th>
              <th scope="col">branch</th>
              <th scope="col">amount</th>
              <th scope="col">type</th>
            </tr>
          </thead>
          <tbody>
           {
            TRASACTIONS_DETAILS.map((item)=>{
                return  <tr>
               <td> {item.account_number} </td>
               <td> {item.bank_name} </td>
               <td> {item.branch} </td>
               <td> {item.amount} </td>
               <td> {item.type} </td>
              </tr>
            })
           }
          </tbody>
        </table>
    </div>
  )
}
