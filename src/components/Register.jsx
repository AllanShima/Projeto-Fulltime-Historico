import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BsCameraVideo } from "react-icons/bs";
import { CiViewTimeline } from "react-icons/ci";

import { IoMdPerson } from "react-icons/io"; // user
import { FaUnlock } from "react-icons/fa"; // password
import { FaLock } from "react-icons/fa"; // confirm password
import { FaUserShield } from "react-icons/fa"; // fsafe

import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { addDoc, collection } from 'firebase/firestore';

const Register = () => {

    // const [dbInstance, setDbInstance] = useState(null);

    // useEffect(() => {
    //     setDbInstance(db);
    // }, [])

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

    const [buttonSelected, setButtonSelected] = useState("monitor");

    const registrarNovoUsuario = async(userId) => {

        // if (!dbInstance) {
        //     throw new Error("Firestore DB is not initialized.");
        // }

        //const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

        // CONSTRUÇÃO DO CAMINHO PRIVADO OBRIGATÓRIO (MANDATORY PRIVATE PATH): 
        // /artifacts/{appId}/users/{userId}/user_profile/{docId}
        // Usamos 'data' como docId para garantir um documento de perfil único.
        try {
            const docRef = await addDoc(collection(db, "users"), {
                uid: userId,
                first: firstName,
                last: lastName,
                email: email,
                usertype: buttonSelected,
                createdAt: new Date()
            });
            console.log("Usuário inserido com o ID: ", docRef.id);
        } catch (e) {
            console.error("Erro ao adicionar o usuário: ", e);
        }
    }
    const register = e => {
        e.preventDefault()

        // firebase register function
        if(password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                // registrado com sucesso
                     
                // Captura o objeto de usuário recém-criado
                const user = userCredential.user;

                // Registrando no firestore o UID, fullName, type
                registrarNovoUsuario(user.uid);

                // O usuário é automaticamente logado depois da sua conta criada
                if(buttonSelected === "monitor"){
                    navigate('/monitor/cameras');
                } else{
                    navigate('/user/home');
                }
            })
            .catch(error => alert(error.message))            
        } else {
            alert("Confirme a senha novamente!")
        }
    }

    const buttonClass = "flex space-x-2 w-full py-1 cursor-default justify-center content-center items-center rounded-lg";
    const buttonOnClass = "bg-primary text-white transition duration-200";
    const buttonOnSafeClass = "bg-red-700 text-white transition duration-200";
    const buttonOffClass = "bg-gray-200 text-primary transition duration-200";

    return (
        <div className='flex w-full h-full items-center justify-center bg-gray-50 font-regular'>
            <div className='grid w-fit h-full justify-center'>
                {/* Fulltime Logo */}
                <div className='flex mr-auto ml-auto justify-center content-center mt-auto mb-auto w-1/2 space-x-2'>
                    <img src="/icon.png" alt="Fulltime logo" className='w-9 rounded-sm'/>
                    <h1 className='mt-auto mb-auto text-red-600 font-bold text-xl'>
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
                    <span className='flex w-xs ml-auto mr-auto h-fit p-1 space-x-1 rounded-xl text-sm bg-gray-200'>
                      <button onClick={() => setButtonSelected("monitor")} className={`${buttonClass}
                        ${buttonSelected === "monitor" ? buttonOnClass : buttonOffClass}`}>
                        <BsCameraVideo className='w-4'/>
                        <h4>Monitor</h4>
                      </button>
                      <button onClick={() => setButtonSelected("f/safe")} className={`${buttonClass} 
                        ${buttonSelected === "f/safe" ? buttonOnSafeClass : buttonOffClass}`}>
                        <FaUserShield className='w-4'/>
                        <h4>F/Safe</h4>
                      </button>
                    </span>
                
                    <button onClick={register}
                    className='w-5/6 h-10 ml-auto mr-auto rounded-4xl font-bold cursor-pointer bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-200 text-md text-white'>
                        Cadastrar
                    </button>

                    <Link className="underline text-blue-700" to={"/login"}>Já cadastrou uma conta?</Link>
                    
                </div>    

                
            </div>

        </div>
    )
}

export default Register
