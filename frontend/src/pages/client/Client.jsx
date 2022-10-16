import React from 'react'
import UpdateAcc from './UpdateAcc'
import {  useNavigate } from 'react-router-dom'
import { useDispatch  , useSelector } from 'react-redux'
import { Profile_details } from '../../action/clientAction'
import PaymentHistory from './PaymentHistory'
import TransferMoney from './TransferMoney'


export default function Client() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const handle_update = async()=>{
      try {
        dispatch(Profile_details())
      console.log("working");
      } catch (error) {
        console.log(error);
      }
 }
 const logout = ()=>{
  try {
    localStorage.removeItem("token")
    navigate("/")
  } catch (error) {
    
  }
} 
  return (
    <div className='container'>
        <div class="card">
          <div class="card-header">header</div>
          <div class="card-body"><div className='flex'>
            <div className='text-centere'>
            
            <button type="button" class="btn btn-info w-50" onClick={handle_update} data-bs-toggle="modal" data-bs-target="#Update_account" >Update Profike</button>
            {/* <button type="button" class="btn btn-danger w-50">sent Money</button> */}
            <button type="button" class="btn btn-danger w-50" data-bs-toggle="modal" data-bs-target="#sent_money"> sent Money</button>
            </div>
            <h1 className='text-center text-success'>Trasnscations</h1>
            <PaymentHistory/>
            <button className="btn btn-outline-success" onClick={logout}>log Out</button>
        </div>
{/*  sent MOney modal */}
<div class="modal fade" id="sent_money" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable " role="document">
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <TransferMoney/>
      </div>
    </div>
  </div>
</div>

      {/* Update account */}
      <div class="modal fade" id="Update_account" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitleId">Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <UpdateAcc/>
      </div>
     
    </div>
  </div>
</div></div>
        </div>


    </div>
  )
}
