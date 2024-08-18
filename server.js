/** Start the Server  */
const express=require("express")
const mongoose=require("mongoose")
const server_config=require("./configs/server.configs")
const db_configs= require("./configs/db.configs")
const user_model= require("./models/user.model")
const bcrypt=require("bcryptjs")
const app= express()
app.use(express.json())
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
    init()
})

async function init(){
    try{
        const user=user_model.findOne({userID : "admin"})

        if (user){
            console.log("Admin is already Present")
            return
    }}
    catch(err){
        console.log("Error while reading data", err)
    }

    try{
        user=await user_model.create({
            name : "Aryan Kumar Shrivstav",
            userID : "admin",
            email : "aryanshrivastav2003@gmail.com",
            usertype : "ADMIN",
            password : bcrypt.hashSync("welcome1",8)
        })
        console.log("Admin Created ",user)
    }catch(err){
        console.log("Error while Creating admin", err)
    }
    
}

// stitch the route to the server
require("./routes/auth.route")(app)

app.listen(server_config.PORT,()=>{
    console.log("Server started at",server_config.PORT)
})