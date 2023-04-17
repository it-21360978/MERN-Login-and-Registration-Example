import React ,{useEffect}from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Assets/OIP.jpg'
import Styles from '../Styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { usernameValidate } from '../Helper/validate';
import { useAuthStore } from '../store/store';




const Username = () => {

   const setUsername= useAuthStore (state=>state.setUsername);
   const username = useAuthStore(state => state.auth.username)


    useEffect(() => {
        console.log(username)
    })

    const formik = useFormik({
        initialValues:{
            Username:''
        },
        validate:usernameValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:async values =>{
           console.log(values)
          setUsername(values.Username)
        }

    })



    return (
        <div className='container mx-auto max-w-md'>
            <Toaster position='top-center'></Toaster>
            <div className='flex justify-center items-center h-screen '>
                <div className={Styles.glass}>

                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Hello Again!</h4>
                            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                                Explore with us....
                            </span>
                    </div>
                    <form className='py-1' onSubmit={formik.handleSubmit}>

                    <div className='profile flex justify-center py-4'>

                        <img src={Avatar} className ={Styles.profile_img} alt ="Avatar"/>
                    </div>

                    <div className='textbox flex flex-col items-center gap-6'>
                        <input{...formik.getFieldProps('Username')} className={Styles.textbox} type = "text" placeholder = "Username"/>
                        <button className={Styles.btn} type='submit'><Link to = '/Password'>Let's go</Link></button>



                    </div>
                    </form>

                    <div className="text-center py-2">
                        <span className='text-gray-500'>Not a memeber <Link className='text-red-500' to ='/register'>Register Now</Link>

                        </span>
                    </div>




                </div>


            </div>
            
        </div>
    );
}

export default Username;
