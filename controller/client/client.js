const express = require('express')

const router = express.Router()

const { default: mongoose } = require('mongoose')

const { Client, transfer_money } = require('../../model/Client_User_Schema')

const message = require('../../util/message')
const md5 = require('md5')

const token = require('../../model/tokenShema')

const { responce, generate_token, verified } = require('../../util/common')

router.post('/client_log_in', async (req, res) => {
  const obj = req.body

  try {
    const chk_client = await Client.findOne({
      email: obj.email,
      password: md5(obj.password)
    })

    if (chk_client != undefined) {
      const client_token = {
        id: chk_client._id,
        role: chk_client.role
      }
      const gen_token = generate_token(client_token)

      if (gen_token != undefined || gen_token != null || gen_token != '') {
        const create_token = await token.create({
          id: chk_client._id,
          role: chk_client.role,
          token: gen_token
        })
        gen_token
          ? responce(true, res, 201, message.LOG_IN, create_token)
          : responce(false, res, 204, message.INVALID_TOKKEN, '')
      } else {
        responce(false, res, 204, message.INVALID_TOKKEN, '')
      }
    } else {
      responce(false, res, 404, message.CHK_LOGIN_DEATILS, '')
    }
  } catch (error) {
    console.log(error)
    responce(false, res, 404, message.NOT_FOUND, error)
  }
})

router.get('/get_client', async (req, res) => {
  const obj = req.body
  try {
    const header_key = req.headers.authorization.split('Bearer')[1].trim()
    const verify_client = verified(header_key)
    if (
      verify_client != null ||
      verify_client != undefined ||
      verify_client != ''
    ) {
      const is_client = await Client.findOne({
        _id: verify_client.id,
        role: 'client'
      })
      is_client != undefined
        ? responce(true, res, 201, message.CLIENT_PROFILE, is_client)
        : responce(false, res, 404, message.NOT_FOUND, '')
    } else {
      responce(false, res, 404, message.INVALID_TOKKEN, '')
    }
  } catch (error) {
    responce(false, res, 404, message.NOT_FOUND, error)
  }
  // update account details
})

router.put('/update_Account', async (req, res) => {
  const obj = req.body
  try {
    const header_key = req.headers.authorization.split('Bearer')[1].trim()
    const verify_client = verified(header_key)
    if (
      verify_client != null ||
      verify_client != undefined ||
      verify_client != ''
    ) {
      const is_client = await Client.findOne({
        _id: verify_client.id,
        role: 'client'
      })

      console.log(verify_client)

      if (is_client != undefined) {
        const update_account = await Client.updateOne(
          {
            _id: mongoose.Types.ObjectId(verify_client.id)
          },
          obj
        )
        //   console.log(update_account , " verify_client.id" , verify_client.id);
        update_account.modifiedCount > 0
          ? responce(true, res, 201, message.CLIENT_PROFILE, update_account)
          : responce(true, res, 201, 'unale to update', '')
      } else {
        responce(false, res, 204, message.ONLY_ADMIN_CREATE, '')
      }
    } else {
      responce(false, res, 404, message.INVALID_TOKKEN, '')
    }
  } catch (error) {
    console.log(error)
    responce(false, res, 404, message.NOT_FOUND, error)
  }
})

router.post('/transfer_money', async (req, res) => {
  const obj = req.body
  try {
    const header_key = req.headers.authorization.split('Bearer')[1].trim()
    const verify_client = verified(header_key)
    if (
      verify_client != null ||
      verify_client != undefined ||
      verify_client != ''
    ) {
      const is_client = await Client.findOne({
        _id: verify_client.id,
        role: 'client'
      })

      if (is_client != undefined) {
        let new_transfer_money = new Object()
        new_transfer_money.client_id = mongoose.Types.ObjectId(verify_client.id)
        new_transfer_money.account_number = mongoose.Types.ObjectId(
          obj.account_number
        )
        new_transfer_money.bank_name = obj.bank_name
        new_transfer_money.branch = obj.branch
        new_transfer_money.amount = obj.amount
        new_transfer_money.type = obj.type

        // trasnfer money
        if (!mongoose.Types.ObjectId(obj.account_number).equals(is_client.bank._id))
         {
          if (obj.amount < is_client.bank.account_balance) {
            const find_account = await Client.findOne({
              'bank._id': mongoose.Types.ObjectId(obj.account_number)
            })

            console.log('find_account', find_account)
            if (find_account != null) {
              const sent_money = await transfer_money.create(new_transfer_money)

              const debit_amount = await Client.updateOne(
                {
                  _id: is_client._id
                },
                {
                  'bank.account_balance':
                    is_client.bank.account_balance - obj.amount
                }
              )

              const credit_amount = await Client.updateOne(
                {
                  _id: find_account._id
                },
                {
                  'bank.account_balance':
                    find_account.bank.account_balance + obj.amount
                }
              )
              
              const recived_money = await transfer_money.create({
                client_id: mongoose.Types.ObjectId(find_account._id),
                account_number: is_client.bank._id,
                bank_name: is_client.bank.bank_name,
                branch: is_client.bank.bank_name,
                amount: obj.amount,
                type: 'credit'
              })
              recived_money 
              ? responce(true , res , 201 , `${message.MONEY_SENT} ${recived_money.account_number}` ,recived_money)
              :

              console.log(recived_money, 'recived_money')
            } else {
              responce(false , res , 404 , message.CHK_ACC_NO , "")
            }

            //  responce(true , res , 201 , `${message.MONEY_SENT} ${obj.account_number}` , sent_money )
          } else {
            responce(false, res, 200, message.LOW_BALNACE, '')
          }
        } else {
          responce(false, res, 200, message.SAME_ACCOUND_NUMBER, '')
        }
      } else {
        responce(false, res, 404, message.ONLY_ADMIN_CREATE, '')
      }
    } else {
      responce(false, res, 404, message.INVALID_TOKKEN, '')
    }
  } catch (error) {
    console.log(error)
    responce(false, res, 404, message.NOT_FOUND, error)
  }
})

router.get("/transactions", async(req , res)=>{
  try {
    const header_key = req.headers.authorization.split('Bearer')[1].trim()
    const verify_client = verified(header_key)
    if (
      verify_client != null ||
      verify_client != undefined ||
      verify_client != ''
    ) {
      console.log(verify_client);
      const is_client = await transfer_money.find({
        client_id: verify_client.id,
      })
      console.log(is_client);
      is_client.length > 0
        ? responce(true, res, 201, message.TRAS_HISTRORY, is_client)
        : responce(false, res, 404, message.NOT_FOUND, '')
    } else {
      responce(false, res, 404, message.INVALID_TOKKEN, '')
    }
  } catch (error) {
    responce(false, res, 404, message.NOT_FOUND, error)
  }
})

router.delete("/log_out", async(req , res)=>{
  try {
    const header_key = req.headers.authorization.split('Bearer')[1].trim()
    const verify_client = verified(header_key)
    if (
      verify_client != null ||
      verify_client != undefined ||
      verify_client != ''
    ) {
      console.log(verify_client);
      const delete_token = await token.deleteOne({
          id: verify_client.id,
      })
      console.log(delete_token);
      
      delete_token.deletedCount > 0
        ? responce(true, res, 201, message.LOG_OUT, delete_token)
        : responce(false, res, 404, message.UNBLE_TO_LOG_OUT, '')
    } else {
      responce(false, res, 404, message.INVALID_TOKKEN, '')
    }
  } catch (error) {
    responce(false, res, 404, message.NOT_FOUND, error)
  }
})
module.exports = router
