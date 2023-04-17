import axios from 'axios';

axios.defaults.baseURL= process.env.REACT_APP_SERVER_DOMAIN;
/**make api requests */



/**authenticate function */
export async function authentication(username){
    try {
        return await axios.post('user/authenticate',{username})

    } catch (error) {

        return {error:"username doesn't exist"}
        
    }
}
// get user details
export async function getUser({username}){
    try {
        const {data}= await axios.get(`/user/${username}`)
        return{data};
    } catch (error) {
        
        return {error:"password doesn't match"}
    }
}


//register user 

export async function registerUser(credentials){

    try {
       const {data: {msg},status}= await axios.post(`/user/register`,credentials)
        
        let {username,email}=credentials;

        //send email
        if(!status === 201){
            await axios.post('/user/registerMail',{username,userEmail:email,text:msg})
        }
        return Promise.resolve(msg);

    } catch (error) {

        return Promise.reject({error})
        
    }

}

// login function
export async function verfyPassword({username,password}){
    try {
        if(username){
            const {data} = await axios.post('/user/login',{username,password})
            return promise.resolve({data});
        }
        
    } catch (error) {
        return Promise.reject({error:"password not match"})
    }
}

//update function
export async function updateuser(response){
    try {

        const token = await localStorage.getItem('token');
        const data = await axios.put('/user/updateuser',response,{headers:{"authorization":`barear ${token}`}})
        
        return promise.resolve({data});
    } catch (error) {
        return promise.reject({error:"cannot update"});
    }
}

// generate otp
export async function generateOTP(username){
    try {
       const {data:{code},status} = await axios.get('/user/generateOTP',{params:{username}})
       
       if(sataus === 201){
      let {data:{email}} = await getUser({username});
      let text = `recovery otp is ${code}.`;
      await axios.post('/user/registerMail',{username,userEmail:email,text,subject:"password otp"});
      
       }
       return promise.resolve(code);

    } catch (error) {
        return promise.reject({error})
    }
}

//verify otp
export async function verifyotp({username,code}){
    try {
        
        const {data,status} = await axios.get('/user/verifyotp',{param:{username,code}})
        return{data,sataus}

    } catch (error) {
        return promise.reject(error);
    }
}

//reset password
export async function resetpassword({username,password}){
    try {
        const {data,status} = await axios.put('/user/resetpassword',{username,password});
        return promise.resolve{data,status};
        
    } catch (error) {
        return promise.reject(error);
    }
}