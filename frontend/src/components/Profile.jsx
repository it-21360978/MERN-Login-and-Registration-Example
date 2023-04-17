import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Styles from '../Styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import Avatar from '../Assets/OIP.jpg';
import { profileValidate} from '../Helper/validate';
import convertBase64 from '../Helper/convert';
import extend  from'../Styles/profile.module.css';
const Register = () => {

 const [file, setFile] = useState();



    const formik = useFormik({
        initialValues:{
            firstName:'',
            lastName:'',
            email:'',
            mobile:'',
            adress:''
        },
        validate:profileValidate,
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
        <div className='container mx-auto w-3/4'>
            <Toaster position='top-center'></Toaster>
            <div className='flex justify-center items-center pt-20 pb-20'>
                <div className={`${Styles.glass} ${extend.glass}`} style={{paddingTop:50,paddingBottom:50}}>

                    <div className="title flex flex-col items-center h-1/3">
                        <h4 className='text-5xl font-bold'>Profile!</h4>
                            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
                                    You can update Profile..                            </span>
                    </div>
                    <form className='py-1' onSubmit={formik.handleSubmit}>

                    <div className='profile flex justify-center py-4'>

                        <label htmlFor='profile'>
                        <img src={file || Avatar} className ={`${Styles.profile_img} ${extend.profile_img}`} alt ="Avatar"/>

                        </label>

                       <input onChange={onUpload} type='file'id='profile' name='avatar'/>
                    </div>

                    <div className='textbox flex flex-col items-center gap-4'>

                        <div className="name flex w-3/4 gap-10">
                        <input{...formik.getFieldProps('firstName')} className={`${Styles.textbox} ${extend.textbox}`} type = "text" placeholder = "first name"/> 
                        <input{...formik.getFieldProps('lastname')} className={`${Styles.textbox} ${extend.textbox}`} type = "text" placeholder = "last name"/>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                        <input{...formik.getFieldProps('mobile')} className={`${Styles.textbox} ${extend.textbox}`} type = "text" placeholder = "Mobile Number"/> 
                        <input{...formik.getFieldProps('email')} className={`${Styles.textbox} ${extend.textbox}`} type = "email" placeholder = "email"/>
                        </div>

                        <div className="name flex w-3/4 gap-10">
                        <input{...formik.getFieldProps('adress')} className={`${Styles.textbox} ${extend.textbox}`} type = "text" placeholder = "Address"/> 
                        <button className={Styles.btn} type='submit'>Update</button>
                        </div>
                        {/**<input{...formik.getFieldProps('email')} className={Styles.textbox} type = "email" placeholder = "email"/>
                        <input{...formik.getFieldProps('Username')} className={Styles.textbox} type = "text" placeholder = "Username"/>
                         <input{...formik.getFieldProps('Password')} className={Styles.textbox} type = "password" placeholder = "Password"/>*/}
                        

                    </div>
                    </form>

                    <div className="text-center py-2">
                        <span className='text-gray-500'>come back later? <Link className='text-red-500' to ='/'>log out </Link>

                        </span>
                    </div>




                </div>


            </div>
            
        </div>
    );
}


export default Register;
