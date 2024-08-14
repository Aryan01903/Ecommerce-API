/** Start the Server  */
const express=require("express")
const mongoose=require("mongoose")
const server_config=require("./configs/server.configs")
const db_configs= require("./configs/db.configs")
const app= express()

/**
 * Creating an admin user at the starting of the application
 * if not already present
 */

// connection with mongoose
mongoose.connect(db_configs.DB_URL)
const db=mongoose.connection
db.on("error",()=>{
    console.log("Error Occured while connecting with mongoDB")
})
db.once("open",()=>{
    console.log("connected with MongoDB")
})


/** Middleware */
app.use(express.json())


app.listen(server_config.PORT,()=>{
    console.log("Server started at",server_config.PORT)
})