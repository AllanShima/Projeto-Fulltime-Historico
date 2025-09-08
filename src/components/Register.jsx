import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FaBuildingShield } from "react-icons/fa6"; //FullCond
import { BiSolidCctv } from "react-icons/bi"; // fullcam
import { FaUserShield } from "react-icons/fa"; // fsafe
import { FaPersonRays } from "react-icons/fa6"; // F/Detect
import { BsFillHouseExclamationFill } from "react-icons/bs"; // FullArm

import { IoMdPerson } from "react-icons/io"; // user
import { FaUnlock } from "react-icons/fa"; // password
import { FaLock } from "react-icons/fa"; // confirm password

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [isPassConfirmFocused, setIsPassConfirmFocused] = useState(false);

    // setFocusClass("outline-2 outline-gray-black text-gray-700")
    const register = e => {
        e.preventDefault()

        // firebase register function
        if(password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // registrado com sucesso
                console.log(auth);
                navigate('/monitor/cameras')

                // Registrar no data layer (useContext) o nome, sobrenome, email e senha (autocompletion dps)
            })
            .catch(error => alert(error.message))            
        } else {
            alert("Confirme a senha novamente!")
        }

    }

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
            
                {/* Sign in box */}        
                <div className='grid ml-auto mr-auto items-center w-120 h-fit bg-white shadow-2xl rounded-sm p-8 space-y-5 text-md'>
                    <span className='flex'>
                        <span className='space-y-2'>
                            <h3 className='text-gray-500'>Nome</h3>
                            <span className={`
                                    flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                    ${isFirstNameFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                                }>
                                <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsFirstNameFocused(true)} onBlur={() => setIsFirstNameFocused(false)} 
                                type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='e.g.Allan' />                            
                            </span>                            
                        </span> 
                        <span className='space-y-2 ml-4'>
                            <h3 className='text-gray-500'>Sobrenome</h3>
                            <span className={`
                                    flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                    ${isLastNameFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                                }>
                                <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsLastNameFocused(true)} onBlur={() => setIsLastNameFocused(false)} 
                                type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='e.g.Shinhama' />                            
                            </span>                            
                        </span>
                    </span> 
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Seu email</h3>
                        <span className={`
                                flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isEmailFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                               <IoMdPerson className='text-gray-900/90 w-3'/>
                            </span>
                            <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsEmailFocused(true)} onBlur={() => setIsEmailFocused(false)} 
                            type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='e.g.allanshinhama@gmail.com' />                            
                        </span>
                    </span> 
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Senha</h3>
                        <span className={`
                                flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isPassFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                               <FaUnlock className='text-gray-900/90 w-3'/>
                            </span>
                            <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsPassFocused(true)} onBlur={() => setIsPassFocused(false)} 
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='e.g.allanshima123'/>                            
                        </span>
                    </span> 
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Confirme sua senha</h3>
                        <span className={`
                                flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isPassConfirmFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                               <FaLock className='text-gray-900/90 w-3'/>
                            </span>
                            <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsPassConfirmFocused(true)} onBlur={() => setIsPassConfirmFocused(false)} 
                            type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='e.g.allanshima123' />                            
                        </span>
                    </span> 
                
                    <button onClick={register}
                    className='w-5/6 h-10 ml-auto mr-auto rounded-4xl font-bold cursor-pointer bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-200 text-md text-white'>
                        Cadastrar
                    </button>

                    <Link className="underline text-blue-700" to={"/login"}>Já cadastrou uma conta?</Link>
                    
                </div>    
                <div className='flex w-fit h-12 space-x-13 font-bold'>
                    {/* FullCond */}
                    <span className='flex items-center w-full h-full text-red-600'>
                        <span className='w-10 rounded-lg outline-3 p-1 bg-white shadow-md'>
                            <FaBuildingShield className='w-full h-full'/>
                        </span>            
                        <h2 className='pl-2 text-xl'>FullCond</h2>        
                    </span>
                    
                    {/* FullCam */}
                    <span className='flex items-center w-full h-full text-red-600'>
                        <span className='w-10 rounded-lg outline-3 p-1 bg-white shadow-md'>
                            <BiSolidCctv className='w-full h-full'/>
                        </span>            
                        <h2 className='pl-2 text-xl'>FullCam</h2>        
                    </span>
                    
                    {/* F/Safe */}
                    <span className='flex items-center w-full h-full text-red-600'>
                        <span className='w-10 rounded-lg outline-3 p-1 bg-white shadow-md'>
                            <FaUserShield className='w-full h-full'/>
                        </span>            
                        <h2 className='pl-2 text-xl'>F/Safe</h2>        
                    </span>
                    {/* FullCam */}
                    <span className='flex items-center w-full h-full text-red-600'>
                        <span className='w-10 rounded-lg outline-3 p-1 bg-white shadow-md'>
                            <FaPersonRays className='w-full h-full'/>
                        </span>            
                        <h2 className='pl-2 text-xl'>F/Detect</h2>        
                    </span>
                    {/* FullCam */}
                    <span className='flex items-center w-full h-full text-red-600'>
                        <span className='w-10 rounded-lg outline-3 p-1 bg-white shadow-md'>
                            <BsFillHouseExclamationFill className='w-full h-full'/>
                        </span>            
                        <h2 className='pl-2 text-xl'>FullArm</h2>        
                    </span>

                </div>
            </div>

        </div>
    )
}

export default Register
