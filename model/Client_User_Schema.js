const mongoose = require("mongoose")

const transfer_details = mongoose.Schema({
    client_id : {
        type : mongoose.Types.ObjectId ,
        require : true
    },
    account_number  : {
        type : mongoose.Types.ObjectId , require : true
    },
    bank_name : {
        type : String , require : true
    },
    branch : {
        type : String , require : true
    },
    amount : {
        type : Number , require : true
    },
    type     : {
        type : String , require : true,
        enum : ["debit" , "credit"],
        default : null 
    }, 
})

const bank_deatils = mongoose.Schema({
    account_number : {
        type :  Number
        
    },
    bank_name : {
        type : String , require : true
    },
    branch : {
        type : String , require : true
    },
    account_balance : {
        type : Number , require : true,
        default : 0
    },
})

const Client = mongoose.Schema({
    
    name : {
        type : String , require : true
    } , 
    mobile : {
        type : Number , require : true , 
        // min: [10, 'at list 10 digit mobile numbers'],
        
    },
    email : {
        type : String , require : true
     } ,
     password : {
        type : String , require : true
     }, 
     role : {
        type : String , 
        enum : ["client"],
        default : "client"
     },
     admin_id : {
        type : mongoose.Types.ObjectId ,
        require : true
    },
    bank : bank_deatils  

} , {timestamps : true})

const Client_details = mongoose.model("Client" ,Client)

const Payment_histrory = mongoose.model("transfer_money" ,transfer_details)


module.exports = { Client : Client_details ,
    
    transfer_money : Payment_histrory }