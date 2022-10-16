const mongoose = require("mongoose")

const super_admin = mongoose.Schema({
    id : {
        type : Number,
        require : true,
        default : 123
    },
    password : {type : String , require : true}

})

const admin = mongoose.Schema({
    name : {
        type : String , require : true
    } , 
    mobile : {
        type : Number , require : true , 
        min: [10, 'at list 10 digit mobile numbers'],
        // max: 12
    },
    email : {
        type : String , require : true
     } ,
     password : {
        type : String , require : true
     }, 
     role : {
        type : String , 
        enum : ["admin"],
        default : "admin"
     }
} , {timestamps : true})

var create_admin = mongoose.model("admin" , admin)

const create_super_admin = mongoose.model("super_admin", super_admin)
module.exports = {
    admin : create_admin ,

    super_admin : create_super_admin
}