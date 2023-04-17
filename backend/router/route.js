import { Router } from "express";
const router = Router();
//import controllers
import * as controller from '../controllers/controller.js';
import { localVariables } from "../middleware/auth.js";
import Auth from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";


/**post methods */
router.route('/register').post(controller.register);// reg user

router.route('/registerMail').post(registerMail)//email send

router.route('/authenticate').post(controller.verifyUser(req,res));//authentication

router.route('/login').post(controller.verifyUser,controller.login);//login user
 


/**get methods */
router.route('/user/:username').get(controller.getUser);// get user using username

router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP);// generate otp

router.route('/verifyotp').get(controller.verifyUser,controller.verifyotp);// verify otp
  
router.route('/createReset').get(controller.createReset);// reset variables
 


/**put methods */
router.route('/updateuser').put(Auth,controller.updateuser)//update profile

router.route('/resetpassword').put(controller.verifyUser,controller.resetpassword)// reset the password

export default router;