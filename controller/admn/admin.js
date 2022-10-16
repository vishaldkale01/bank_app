const express = require('express')

const { super_admin, admin } = require('../../model/Admin_User_Schema')

const { responce, generate_token, verified } = require('../../util/common')

const message = require('../../util/message')
const md5 = require('md5')

const token = require('../../model/tokenShema')
const { default: mongoose } = require('mongoose')
const { Client } = require('../../model/Client_User_Schema')

const router = express.Router()

// super admin ✔✔
router.post('/super_admin', async (req, res) => {
  const obj = req.body
  try {
    const Create_Super_admin = await super_admin.create(obj)

    obj != undefined
      ? responce(true, res, 201, message.ADMIN_CREATE, Create_Super_admin)
      : responce(false, res, 404, message.NOT_FOUND, '')
  } catch (error) {
    responce(false, res, 404, message.NOT_FOUND, error)
  }
})
// create admins ✔✔

router.post('/admin', async (req, res) => {
  const obj = req.body

  // check us super adim or not

  const chk_super_adm = await super_admin.findOne({
    id: obj.super_admin_id,
    password: obj.super_admin_password
  })
  console.log(chk_super_adm)
  if (chk_super_adm != undefined || chk_super_adm != null) {
    try {
      const create_admin = await admin.create({
        name: obj.name,
        mobile: obj.mobile,
        email: obj.email,
        password: md5(obj.password),
        role: obj.role
      })
      console.log(create_admin)
      create_admin
        ? responce(true, res, 201, message.ADMIN_CREATE, create_admin)
        : responce(true, res, 404, message.NOT_FOUND, '')
    } catch (error) {
      responce(true, res, 404, message.NOT_FOUND, error)
    }
  } else {
    responce(false, res, 404, message.SUPER_ADIM, '')
  }
})
//login ✔✔
router.post('/admin_log_in', async (req, res) => {
  const obj = req.body

  try {
    const chk_admin = await admin.findOne({
      email: obj.email,
      password: md5(obj.password)
    })

    if (chk_admin != undefined) {
      const admin_token = {
        id: chk_admin._id,
        role: chk_admin.role
      }
      const gen_token = generate_token(admin_token)

      if (gen_token != undefined || gen_token != null || gen_token != '') {
        const create_token = await token.create({
          id: chk_admin,
          role: chk_admin.role,
          token: gen_token
        })

        gen_token
          ? responce(true, res, 201, message.LOG_IN, create_token)
          : responce(false, res, 204, message.INVALID_TOKKEN, '')
      } else {
        responce(false, res, 200, message.INVALID_TOKKEN, '')
      }
    } 
    else {
      responce(false, res, 401, message.CHK_LOGIN_DEATILS, '')
    }
  } catch (error) {
    responce(false, res, 404, message.NOT_FOUND, error)
  }
})

router.delete('/log_out', async (req, res) => {})

router.post('/add_client', async (req, res) => {
  const obj = req.body
try {
  const header_key = req.headers.authorization.split("Bearer")[1].trim()
        const verify_admin = verified(header_key) 
        if ( verify_admin != null || verify_admin != undefined || verify_admin != "") {

          const is_Admin = await admin.findOne({
            _id : verify_admin.id,
            role : "admin"
          })
          if (is_Admin !=undefined) {
            let new_client = new Object()
          //  new_client._id = obj._id
           new_client.name = obj.name
           new_client.mobile = obj.mobile
           new_client.email = obj.email
           new_client.password = md5(obj.password)
           new_client.role = "client"
           new_client.admin_id = verify_admin.id
           new_client.bank = obj.bank
           
            const create_client = await Client.create(new_client)
            
            console.log("create_client",create_client.bank._id);
            responce(true , res , 201 , message.ACC_CREATE , create_client)

          } else {
            responce(false , res , 204 , message.ONLY_ADMIN_CREATE , "")
          }

        } else {
          responce(false , res , 404 , message.INVALID_TOKKEN , "")
        } 

} catch (error) {
  responce(false , res , 404 , message.NOT_FOUND , error)
}


})
// upadet admin ✔✔
router.put('/update_client', async (req, res) => {
  const obj = req.body
try {
  const header_key = req.headers.authorization.split("Bearer")[1].trim()
        const verify_admin = verified(header_key) 
        if ( verify_admin != null || verify_admin != undefined || verify_admin != "") {

          const is_Admin = await admin.findOne({
            _id : verify_admin.id,
            role : "admin"
          })
          if (is_Admin !=undefined) {
            
            const update_client = await Client.updateOne({
              _id : mongoose.Types.ObjectId(obj.client_id)
            },obj)
            
            console.log("create_client",update_client);
             update_client.modifiedCount > 0 ? responce(true , res , 201 , message.CLIENT_UPDATE , update_client)
             : responce(true , res , 201 , "unale to update" , "")

          } else {
            responce(false , res , 204 , message.ONLY_ADMIN_CREATE , "")
          }

        } else {
          responce(false , res , 404 , message.INVALID_TOKKEN , "")
        } 

} catch (error) {
  console.log(error);
  responce(false , res , 404 , message.NOT_FOUND , error)
}


})

router.get("/client_Record",async (req , res)=>{
  console.log("api work");
try {
  const client_record = await Client.find()
  console.log(client_record);
  responce(true , res , 200 , "all client record" , client_record)
} catch (error) {
  responce(false , res , 404 , "all client record" , error)
}
})

module.exports = router
