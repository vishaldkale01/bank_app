const mongoose = require("mongoose")
require("dotenv").config({path : "../config/.env"})
// const db = require("../config/.end")



const db = async () =>{
    try {
         await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = db