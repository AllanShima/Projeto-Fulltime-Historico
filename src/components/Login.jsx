import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import SoftwareIcon from './ui/SoftwareIcon';

import { IoMdPerson } from "react-icons/io"; // user
import { FaUnlock } from "react-icons/fa"; // password

import { signInWithEmailAndPassword } from "firebase/auth";

import { useUserContext } from '../contexts/user-context';
import { where, query, getDocs, collection } from 'firebase/firestore';
import { auth } from '../services/firebase';

const Login = () => {

    const { userState, userDispatch } = useUserContext();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);

    const signIn = e => {
        e.preventDefault()

        // firebase login function
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // logado com sucesso
            console.log(userCredential)
            
            if(userState.usertype == "f/center"){
                navigate('/monitor/cameras')
            } else {
                navigate('/user/home');
            }
        })
        .catch(error => alert(error.message))
    }

    const inputRef = useRef();

    // Detectando o enter quando a senha já foi digitada
    const handleEnterKey = (event) => {
        if (event.key === "Enter"){
            if (event.target.type === "text"){
                inputRef.current.focus();
            }
            if(event.target.type === "password") {
                signIn(event);
            }
        }
    }

    // setFocusClass("outline-2 outline-gray-black text-gray-700")

    return (
        <div className='flex w-full h-full items-center justify-center bg-gray-50 font-regular'>
            <div className='grid w-fit h-full justify-center'>
                {/* Fulltime Logo */}
                <a href="/" className='flex'>
                    <div className='flex mr-auto ml-auto justify-center content-center mt-auto mb-auto w-1/2 space-x-2'>
                        <img src="/icon.png" alt="Fulltime logo" className='w-9 rounded-sm'/>
                        <h1 className='mt-auto mb-auto text-red-600 font-bold text-xl'>
                            FullCenter
                        </h1>
                    </div>                      
                </a>
                
                {/* Welcome title */}
                <h1 className='h-fit mt-auto mb-auto mr-auto ml-auto text-4xl font-extrabold text-gray-800'>
                    Bom te ver novamente
                </h1>
                {/* Sign in box */}        
                <div className='grid ml-auto mr-auto items-center w-120 h-fit bg-white shadow-2xl rounded-sm p-8 space-y-7 text-md'>
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Seu email</h3>
                        <span className={`flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isEmailFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                               <IoMdPerson className='text-gray-900/90 w-3'/>
                            </span>
                            <input onKeyUp={handleEnterKey} className={`w-full pl-4 focus:outline-none`} 
                            onFocus={() => setIsEmailFocused(true)} onBlur={() => setIsEmailFocused(false)} 
                            type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='e.g.allanshinhabelo@gmail.com' />                            
                        </span>
                    </span> 
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Sua senha</h3>
                        <span className={`
                                flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isPassFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                               <FaUnlock className='text-gray-900/90 w-3'/>
                            </span>
                            <input ref={inputRef} onKeyUp={handleEnterKey} className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsPassFocused(true)} onBlur={() => setIsPassFocused(false)} 
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='e.g.allanshima123' />                            
                        </span>
                    </span> 
                    <button onClick={signIn}
                            className='w-5/6 h-10 ml-auto mr-auto rounded-4xl font-bold cursor-pointer bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-200 text-md text-white'>
                        Login
                    </button>
                    <Link className="underline text-blue-700" to={"/register"}>Não tem uma conta?</Link>
                </div>    

                {/* Fulltime Softwares */}
                <div className='flex w-fit h-12 space-x-13 font-bold'>
                    <SoftwareIcon title="FullCenter" showTitle={true}/>
                    <SoftwareIcon title="FullCond" showTitle={true}/>
                    <SoftwareIcon title="FullCam" showTitle={true}/>
                    <SoftwareIcon title="F/Safe" showTitle={true}/>
                    <SoftwareIcon title="F/Detect" showTitle={true}/>
                    <SoftwareIcon title="FullArm" showTitle={true}/>
                </div>
            </div>

        </div>
    )
}

export default Login
