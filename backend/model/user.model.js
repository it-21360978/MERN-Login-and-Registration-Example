import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        required:[true,"provide unique username"],
        unique:[true,"username exist"]
    },
    password:{
        type:String,
        required:[true,"provide the password"],
        unique:false
    },
    email:{
        type:String,
        required:[true],
        unique:false
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required: false
    },
    mobile:{
        type:Number
    },
    address:{
        type:String
    },
    profile:{
        type:String
    }

})

export default mongoose.model('User',UserSchema);