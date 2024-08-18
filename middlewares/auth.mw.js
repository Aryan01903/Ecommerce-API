/**
 * create a mw will check if the request body is proper and correct
 */
const verifySignupBody = async (req,res,next)=>{
    try{
        
        //check for the name
        if(!req.body.name){
            res.status(400).send({
                message:"failed ! name is not provided in request body"
            })
        }

        //check for the email
        if(!req.body.email){
            res.status(400).send({
                message:"failed ! email is not provided in request body"
            })
        }

        //check for the userId
        if(!req.body.userId){
            res.status(400).send({
                message:"failed ! userId is not provided in request body"
            })
        }

        //check if the user with the same userId is already present
        const user = await user_model.findOne({userId:req.body.userId})
        if(user){
            res.status(400).send({
                message:"failed ! user with same userid present"
            })
        }
        next()

    }catch(err){
        console.log("error occured",err)
        res.status(500).send({
            message:"error occured while validating the request body"
        })
    }
}


module.exports={
    verifySignupBody:verifySignupBody
}