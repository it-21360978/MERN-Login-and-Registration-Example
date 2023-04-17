import React from 'react';
import { Link } from 'react-router-dom';
import Styles from '../Styles/Username.module.css';
import { Toaster } from 'react-hot-toast';

const Recovery = () => {
   
    return (
        <div className='container mx-auto max-w-md'>
            <Toaster position='top-center'></Toaster>
            <div className='flex justify-center items-center h-screen '>
                <div className={Styles.glass}>

                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Recovery Now!</h4>
                            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                                Enter OTP Code to recovery password..                            </span>
                    </div>
                    <form className=' pt-6'>

                        <span className='flex justify-center align-center text-center py-4 '>
                            Enter 6 digit OTP sent to your E-mail...
                        </span>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input className={Styles.textbox} type = "text" placeholder = "OTP Code"/>
                        <button className={Styles.btn} type='submit'><Link to = '/reset'>send</Link></button>



                    </div>
                    </form>

                    <div className="text-center py-2">
                        <span className='text-gray-500'> Not recieved email? <Link className='text-red-500' to ='#'>Resend OTP </Link>

                        </span>
                    </div>




                </div>


            </div>
            
        </div>
    );
}


export default Recovery;
