import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Styles from '../Styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import Avatar from '../Assets/OIP.jpg';
import {EmailValidate} from '../Helper/validate';
import convertBase64 from '../Helper/convert';

const Register = () => {

 const [file, setFile] = useState();



    const formik = useFormik({
        initialValues:{
            Username:'',
            email:'',
            Password:''
        },
        validate:EmailValidate,
        validateOnBlur:false,
        validateOnChange:false,
       
        onSubmit:async values =>{
           var profile = await  Object.assign({profile:file || ''})
            console.log(values,profile);
        }

    })
/**file handler for the image */
const onUpload = async Event =>{
    const base64 = await convertBase64(Event.target.files[0]);
    setFile(base64);
}



    return (
        <div className='container mx-auto max-w-md'>
            <Toaster position='top-center'></Toaster>
            <div className='flex justify-center items-center pt-5 pb-10'>
                <div className={Styles.glass} style={{padding:50,paddingBottom:50}}>

                    <div className="title flex flex-col items-center h-1/3">
                        <h4 className='text-5xl font-bold'>Register!</h4>
                            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
                                    Happy to join with you...                            </span>
                    </div>
                    <form className='py-1' onSubmit={formik.handleSubmit}>

                    <div className='profile flex justify-center py-4'>

                        <label htmlFor='profile'>
                        <img src={file || Avatar} className ={Styles.profile_img} alt ="Avatar"/>

                        </label>

                       <input onChange={onUpload} type='file'id='profile' name='avatar'/>
                    </div>

                    <div className='textbox flex flex-col items-center gap-4'>
                        <input{...formik.getFieldProps('email')} className={Styles.textbox} type = "email" placeholder = "email"/>
                        <input{...formik.getFieldProps('Username')} className={Styles.textbox} type = "text" placeholder = "Username"/>
                        <input{...formik.getFieldProps('Password')} className={Styles.textbox} type = "password" placeholder = "Password"/>
                        <button className={Styles.btn} type='submit'>sign up</button>

                    </div>
                    </form>

                    <div className="text-center py-2">
                        <span className='text-gray-500'>Already memeber? <Link className='text-red-500' to ='/'>Sign in </Link>

                        </span>
                    </div>




                </div>


            </div>
            
        </div>
    );
}


export default Register;
