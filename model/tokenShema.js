const mongoose = require("mongoose")

const token = mongoose.Schema({
        id : {
        type : mongoose.Types.ObjectId,
        require : true
    },
    role : {
        type : String , 
        enum : ["admin" , "client"],
        // default : nul    l ,
        require : true
     },
     token : {
        type : String
     }
})

module.exports = mongoose.model("token" , token)