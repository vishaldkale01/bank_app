require("dotenv").config({path : "../config/.env"})
require("../config/.env")

const jwt = require("jsonwebtoken")
// generate_token token
const generate_token = (data)=>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign(data , jwtSecretKey)
    console.log(token);
    
    return token
}
// verify token
const verified = (token ) =>{
    const jwtSecretKey = process.env.JWT_SECRET_KEY
    const verify = jwt.verify(token , jwtSecretKey)
    if (verify) {
        
        return verify 
    } else {
        console.log("not verfity");
        return false
    }
}

// sent  responce 

const responce = (success , res, status_code , message , data)=>{
    if (success == true) {
        res.status(status_code).json({
            success : true,   
            message : message , 
            data : data
       })
    } else {
        res.status(status_code).json({               
            message : data == "" ? message : `${message} ${data}` 
           })
    }
} 
module.exports = {
    responce , generate_token , verified 
}