const express = require("express")

const cors = require("cors")

require("dotenv").config({path : "./config/.env"})

const db = require("./config/db")

db()

const app = express()

app.use(express.json())

app.use(cors())


app.use("/admin",require("./controller/admn/admin"))
app.use("/client",require("./controller/client/client"))

app.listen(process.env.PORT || 5000,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})