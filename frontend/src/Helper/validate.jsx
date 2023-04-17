import toast from "react-hot-toast"


/**validate login page username */
export async function usernameValidate(values){
    const errors = usernameverify({},values);

    return errors;
}

/**validate password in login page */
export async function PasswordValidate(values){
    const errors = passwordverify({},values);
    return errors;
}

/**validate reset password */
export async function ResetPasswordValidate(values){
    const errors = ResetPasswordVerify({},values) ;
    return errors;
}
/**validate register form */
export async function EmailValidate(values){
    const errors = emailVerify({},values);
    passwordverify({},values);
    usernameverify({},values);
    

    return errors;
}

/**validate profile */
export async function profileValidate(values){
    const errors = emailVerify({},values)
    return errors;
}


/**validate username */

  function usernameverify(error={},values){

    if(!values.Username){
        error.Username=toast.error('Username Required');
    }else if(values.Username.includes(" ")){
        error.Username=toast.error('invalid username');
    }
    
    return error;
}

/**validate password */
function passwordverify(error={},values){

    const symbol =/['!,@,#,$,%,^,&,*,(,),?']/;
    const lower = /[a-z]/;
    const upper = /[A-Z]/;

    if(!values.Password){
        error.Passworde=toast.error('Password Required');
    }else if(values.Password.includes(" ")){
        error.Password=toast.error('invalid Password');
    }else if(values.Password.length < 4){
        error.Password = toast.error('must long for 4 characters');
    }else if(!symbol.test(values.Password)){
        error.Password = toast.error('Must include special characters');
    }else if (!lower.test(values.Password)){
        error.Password=toast.error('please add the lowercase letter');
    }else if (!upper.test(values.Password)){
        error.Password=toast.error('please add the uppercase letter');
    }
    return error;

}

/**reset password verify */
function ResetPasswordVerify(error={},values){

    const symbol =/['!,@,#,$,%,^,&,*,(,),?']/;
    const lower = /[a-z]/;
    const upper = /[A-Z]/;

    if(values.Password !== values.confirmPassword){
        error.Password = toast.error('confirm password is not matched');
    }

     if(!values.Password){
        error.Passworde=toast.error('Password Required');
    }else if(values.Password.includes(" ")){
        error.Password=toast.error('invalid Password');
    }else if(values.Password.length < 4){
        error.Password = toast.error('must long for 4 characters');
    }else if(!symbol.test(values.Password)){
        error.Password = toast.error('Must include special characters');
    }else if (!lower.test(values.Password)){
        error.Password=toast.error('please add the lowercase letter');
    }else if (!upper.test(values.Password)){
        error.Password=toast.error('please add the uppercase letter');
    }

    return error;

}
/**verify register form */
function emailVerify(error={},values){

    
    if(!values.email){
        error.email = toast.error('required email');
    } else if (values.email.includes(" ")){
        error.email = toast.error('wrong Email....!')
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error('invalid email..')
    }
return error;

}
