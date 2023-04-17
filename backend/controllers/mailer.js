import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';


let nodeConfig = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    }
});

let mailGenarate = new Mailgen({

    theme:"default",
    product:{
        name:"mailgen",
        link:'https://mailgen.js/'
    }
})

export const registerMail = async(req,res) =>{
    const {username,userEmail,text,subject} = req.body;


    // body of the email
    var email = {
        body:{
            name:username,
            intro:text || "welcome to coding",
            outro:"contact us"
        }
    }
    var emailbody = mailGenarate.generate(email);

    var msg = {
        from:ENV.EMAIL,
        to:userEmail,
        subject:subject || "signup successful",
        html:emailbody
    }

    nodeConfig.sendMail(msg).then(()=>{
        return res.status(200).send("you should have sent our email verification");

    }).catch(error =>{
        return res.status(500).send({error});
    })
}