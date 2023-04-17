import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpgenerator from 'otp-generator';


/**middleware for verify user*/
export async function verifyUser(req,res,next){
    try {
        const {username} = req.method == "GET"? req.query:req.body;

        //check user existing
        let exist = await userModel.findOne({username});
        if(!exist) return res.status(404).send({error:"Can't find user"});

        next();
        
    } catch (error) {
        return res.status(404).send({error:"authentication error"});
        
    }
}
/**http://localhost:8080/user/register */
export async function register(req,res){
    try {
        const {username,password,email,profile} = req.body;
        //check the existing user 
        const existUsername = new Promise((resolve ,reject)=>{
            userModel.findOne({username},function (error,user){
                if(error)reject(new Error(error))
                if(user) reject({error:"use unique username"});

                resolve();
                
            })
        });

        /**check existing email */

        const existEmail = new Promise((resolve ,reject)=>{
            userModel.findOne({email},function (error,email){
                if(error)reject(new Error(error))
                if(email) reject({error:"use unique email"});

                resolve();
                
            })
        });

        Promise.all([existUsername,existEmail]).then(()=>{

            if(password){
                bcrypt.hash(password,10).then(hashedPassword =>{

                    const user = new userModel({
                        username,
                        password:hashedPassword,
                        profile:profile || '',
                        email
                    })

                    // return save result as response
                    user.save().then(result => res.status(201).send({
                        msg:"user registered succesfully!"
                    })).catch(error => res.status(500).send({error}));

                }).catch(error =>{

                    return res.status(500).send({
                        error:"enabled to hashed Paswword"
                    })
                })

            }

        }).catch(error =>{
            return res.status(500).send({ error })
        })
        
    } catch (error) {
        return res.status(500).send(error);
        
    }
}
/**http://localhost:8080/user/login */
export async function login(req,res){
    
    const {username,password} = req.body;
    try {
        userModel.findOne({username}).then(user =>{

            bcrypt.compare(password,user.password).then(passwordCheck =>{

                if(!passwordCheck)return res.status(400).send(error);

                // create jWt token
                const token = jwt.sign({

                    userId: user._id,
                    username : user.username,},
                    ENV.JWT_SECRET,{expiresIn:"24h"
                });
                    return res.status(200).send({
                        msg:"login successful...!",
                        username:user.username,
                        token
                    })


            })

            .catch(error =>{
                res.status(400).send({error:"password doesn't match"})
            })
        })


        .catch(error =>{
            return res.status(404).send({error:"username not found"})});
        
    } catch (error) {

        return res.status(500).send({error});
        
    }
}
/**http://localhost:8080/user/:user */
export async function getUser(req,res){
   const {username} = req.param;
   try {
    if(!username)return res.status(501).send({error:"invalid username"});
    userModel.findOne({username},function (err,user){
        if(err) return res.status(500).send({error});
        if(!user) return res.status(501).send({error:"coudn't find the user"});

        //mongoose unnecesory data convert to the json format and remove the password
        const {password,...rest} = Object.assign({},user.json());
        return res.status(201).send(user);

    })
    
   } catch (error) {
    
    return res.status(404).send({error:"can't find user data"});
   }

}
/**http://localhost:8080/user/update */
export async function updateuser(req,res){
    try {
        //const id = req.query.id;
        const {userId} = req.user;
        if(id){
            const body = req.body;

            // update the data
            userModel.updateOne({_id:userId},body,function(err,data){
                if(err) throw err;

                return res.status(201).send({msg:"updated"});
            });

        }else{
            return res.status(401).send({error:"user not found"});
        }
    } catch (error) {
        return res.status(401).send({error});
        
    }
}
/**http://localhost:8080/user/generateotp */
export async function generateOTP(req,res){
   req.app.locals.OTP = await otpgenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
   res.status(201).send({code:req.app.locals.OTP})
}

/**http://localhost:8080/user/verifyotp */
export async function verifyotp(req,res){
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP)=== parseInt(code)){
        req.app.locals.OTP = null,// rest the otp
        req.app.locals.resetSession = true;//start the reset password session
        return res.status(201).send({msg:"verify success"})
    }
    return res.status(400).send({error:"invalid otp"});
}
/**http://localhost:8080/user/createReset */
export async function createReset(req,res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;//allow access to this only one route
        return res.status(201).send({msg:"access garanted"})

    }
    return res.status(440).send({err:"session expired"});

}

/**http://localhost:8080/user/resetpassword */
export async function resetpassword(req,res){
    try {
        
        if(!req.app.locals.resetSession)
        return res.status(401).send({error:"session expired"});
        const {username,password} = req.body;
        try {

            userModel.findOne({username}).then(user=>{
                bcrypt.hash(password,10).then(hashedPassword =>{

                   userModel.updateOne({username: user.username},
                    {password:hashedPassword},function(err,data){

                        if(err) throw err;
                        return res.status(201).send({msg:"record updated"})
                    }); 

                }).catch(error =>{
                    return res.status(500).send({error:"enabled to hashed password"});
                })

            }).catch(error =>{
                return res.status(404).send({msg:"username not found"});
            })
            
        } catch (error) {

            return res.status(500).send(error);
            
        }

    } catch (error) {
        return res.status(401).send(error);
    }
}
