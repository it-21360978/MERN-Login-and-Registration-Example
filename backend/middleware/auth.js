import jwt from "jsonwebtoken";
import ENV from '../config.js';


/**auth middleware */
export default async function Auth(req,res,next){
    try {
        
        //access authorized header to validate request
        const token = req.headers.authorization.split("-");

        //retrieve details to logged user
        const decodedToken = await jwt.verify(token,ENV.JWT_SECRET);

        res.json(decodedToken);
        //res.json(token);
        next();
    } catch (error) {
        return res.status(501).send(error);
    }
}


export function localVariables(req,res,next){
    req.app.locals = {
        OTP:null,
        resetSession:false
    }
    next();
}