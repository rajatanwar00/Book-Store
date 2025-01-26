import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const backendURL=process.env.REACT_APP_BACKENDURL;

function Header() {
    const [user,setUser]=useState('')
    const [picture,setPicture]=useState('')
    const navigate=useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('jwtToken');
        axios.get(`${backendURL}/user`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response)=>{
            setUser(response.data.name);
            setPicture(response.data.picture);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    function logout(e){
        e.preventDefault();

        localStorage.clear();
        navigate('/login');
    }

  return (
    <div>
        <div className='bg-sky-600 text-white p-2'>
            <div className='text-center font-bold font-mono text-5xl'>
                Book Store
            </div>
            <div className='flex justify-between p-1'>
                <div>
                    <div className='flex justify-start'>
                        <img src={picture} alt=''/>
                        <p className='flex items-end pl-3'>{user}</p>
                    </div>
                </div>
                <div className='flex items-end'>
                    <button className='pr-2 pl-2 rounded-sm hover:bg-sky-700' onClick={(e)=>logout(e)}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header