import React from 'react'
import axios from 'axios';
import libImg from '../assets/Library.jpg'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const gID=import.meta.env.VITE_GID;
const backendURL=import.meta.env.VITE_BACKEND_URL;

console.log(gID,backendURL)

function Login() {
    const navigate=useNavigate();

    async function handleSuccess(googleResponse){
        console.log("Google Success Response ");
        
        try{
            const serverResponse= await axios.post(`${backendURL}/login`,{
                authToken:googleResponse.credential
            })

            localStorage.setItem('jwtToken',serverResponse.data.serverToken)
            navigate('/');
        }
        catch(error){
            console.log(error)
            //my server failed
            //popup implementation requesting user to try again 
        }
    }

    function handleFailure(googleResponse){
        console.log("Google Failed Response ", googleResponse);
        //google failed login
        //requesting user to try again
    }

  return (
    <GoogleOAuthProvider clientId={gID}>
        <div style={{backgroundImage:`url(${libImg})`}}  className='bg-cover h-screen'>
            <div className='flex justify-around h-screen'>
                <div className='p-2 flex items-center w-1/2'>
                    <TypeAnimation
                        sequence={[
                            'Thanks!!\nFor choosing us.', 
                            1000, 
                            '',
                        ]}
                        wrapper="div"
                        cursor={true}
                        speed={10}
                        repeat={Infinity}
                        className='text-white text-8xl font-thin whitespace-pre-line'
                        />
                </div>
                <div className='flex justify-center items-center h-screen w-1/2'>
                    <div className='bg-gray-300 w-4/5 h-4/5 flex-col justify-end bg-opacity-90 rounded-lg shadow-md shadow-gray-300'>
                        <div>
                            <div className='pt-10'>
                                <p className='p-3 text-center text-6xl font-serif text-sky-700 font-bold'>
                                    Book Store
                                </p>
                            </div>
                            <br></br>
                            <div>
                                <p className='p-3 text-2xl'>
                                    One solution for all your reading needs.
                                </p>
                            </div>
                        </div>

                        <div className='p-3 flex justify-center items-center'>
                            <div>
                                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} style={{}}/>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GoogleOAuthProvider>    
  )
}

export default Login