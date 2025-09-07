import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaBuildingShield } from "react-icons/fa6"; //FullCond
import { BiSolidCctv } from "react-icons/bi"; // fullcam
import { FaUserShield } from "react-icons/fa"; // fsafe
import { FaPersonRays } from "react-icons/fa6"; // F/Detect
import { BsFillHouseExclamationFill } from "react-icons/bs"; // FullArm

import { IoMdPerson } from "react-icons/io"; // user
import { FaUnlock } from "react-icons/fa"; // password

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);

    // setFocusClass("border-2 border-gray-black text-gray-700")

    return (
        <div className='flex w-full h-full items-center justify-center bg-gray-50 font-regular'>
            <div className='grid w-fit h-full justify-center'>
                {/* Fulltime Logo */}
                <div className='flex mr-auto ml-auto justify-center content-center mt-auto mb-auto w-1/2 space-x-2'>
                    <img src="/icon.png" alt="Fulltime logo" className='w-8 rounded-sm'/>
                    <h1 className='mt-auto mb-auto text-primary font-bold'>
                        FullCenter
                    </h1>
                </div>
                
                {/* Welcome title */}
                <h1 className='h-fit mt-auto mb-auto mr-auto ml-auto text-4xl font-extrabold text-gray-800'>
                    Bom te ver novamente
                </h1>
                {/* Sign in box */}        
                <div className='grid ml-auto mr-auto items-center w-120 h-fit bg-white shadow-2xl rounded-sm p-8 space-y-7 text-md'>
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Seu email</h3>
                        <span className={`flex items-center w-full h-10 border-2 border-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isEmailFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center border-r-1 text-gray-300'>
                               <IoMdPerson className='text-gray-900/90 w-3'/>
                            </span>
                            <input className={`w-full pl-4 focus:outline-none`} 
                            onFocus={() => setIsEmailFocused(true)} onBlur={() => setIsEmailFocused(false)} 
                            type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='e.g.allanshima123' />                            
                        </span>
                    </span> 
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Sua senha</h3>
                        <span className={`
                                flex items-center w-full h-10 border-2 border-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isPassFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center border-r-1 text-gray-300'>
                               <FaUnlock className='text-gray-900/90 w-3'/>
                            </span>
                            <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsPassFocused(true)} onBlur={() => setIsPassFocused(false)} 
                            type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='e.g.allanshima123' />                            
                        </span>
                    </span> 
                
                    <button className='w-5/6 h-10 ml-auto mr-auto rounded-4xl font-bold cursor-pointer bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-200 text-md text-white'>
                        Login
                    </button>

                    <Link className="underline text-blue-700" to={"/register"}>Não tem uma conta?</Link>
                    
                </div>    
            </div>

        </div>
    )
}

export default Login
