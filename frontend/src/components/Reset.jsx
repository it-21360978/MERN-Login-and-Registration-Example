import React from 'react';
//import { Link } from 'react-router-dom';
import Styles from '../Styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { ResetPasswordValidate } from '../Helper/validate';


const Reset = () => {
    const formik = useFormik({
        initialValues:{
            Password:'',
            confirmPassword:''
        },
        validate:ResetPasswordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
            console.log(values)
        }

    })




    return (
        <div className='container mx-auto max-w-md'>
            <Toaster position='top-center'></Toaster>
            <div className='flex justify-center items-center h-screen '>
                <div className={Styles.glass}>

                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold flex  text-center'>Reset your Password</h4>
                            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                                 Enter the new password...
                            </span>
                    </div>
                    <form className='py-10' onSubmit={formik.handleSubmit}>

                    <div className='textbox flex flex-col items-center gap-6'>
                        <input{...formik.getFieldProps('Password')} className={Styles.textbox} type = "password" placeholder = " New Password"/>
                        <input{...formik.getFieldProps('confirmPassword')} className={Styles.textbox} type = "password" placeholder = "Confirm Password"/>
                        <button className={Styles.btn}  type='submit'>Reset</button>



                    </div>
                    </form>

                </div>


            </div>
            
        </div>
    );
}


export default Reset;
