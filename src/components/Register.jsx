import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BsCameraVideo } from "react-icons/bs";
import { CiViewTimeline } from "react-icons/ci";
import { PiAddressBookFill } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";

import { IoMdPerson } from "react-icons/io"; // user
import { FaUnlock } from "react-icons/fa"; // password
import { FaLock } from "react-icons/fa"; // confirm password
import { FaUserShield } from "react-icons/fa"; // fsafe

import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestoreSetNewUser } from '../services/api/FirebaseSetFunctions';

import {
    useMapsLibrary // Adicionado para acessar o Geocoder
} from '@vis.gl/react-google-maps';
import { useUserContext } from '../contexts/user-context';

const Register = () => {

    const { userState, userDispatch } = useUserContext();

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')

    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [isPassConfirmFocused, setIsPassConfirmFocused] = useState(false);
    const [isAdressFocused, setIsAddressFocused] = useState(false);
    const [isPhoneNumberFocused, SetIsPhoneNumberFocused] = useState(false);

    const [confirmedLocation, setConfirmedLocation] = useState(null);

    const [buttonSelected, setButtonSelected] = useState("f/center");

    // Hooks da biblioteca para garantir que tudo esteja carregado
    const geocodingLibrary = useMapsLibrary('geocoding'); // Carrega a biblioteca de geocoding
    
    // 2. Função principal de geocoding - Não precisa de async pois ela já retorna uma promise
    const handleGeocode = () => {

        if (!geocodingLibrary) {
            console.warn("A biblioteca de Geocoding ainda não está carregada.");
            // Retorna uma Promise resolvida com um status de erro customizado
            return Promise.resolve("NOT_LOADED"); 
        }

        // Retorna uma Promise que resolve ou rejeita com o status
        return new Promise((resolve, reject) => {
            const geocoder = new geocodingLibrary.Geocoder();
            // Chama o Geocoder com o endereço do input
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK' && results.length > 0) {
                    const location = results[0].geometry.location;
                    resolve({ status: 'OK', location: location });
                } else {
                    console.error('Geocoding falhou devido a: ' + status);
                    reject(status); // Rejeita com o status de erro
                }
            });            
        })
    };

    const register = async e => {
        e.preventDefault()

        if (address == '' || email == '' || password == '' || confirmPassword == '' || firstName == '' || lastName == '') {
            window.alert('Há informações faltando...');
            return;
        }

        let finalLocation = null;

        try {
            // 🚀 CAPTURA O RESULTADO AQUI
            const geocodeResult = await handleGeocode();
            finalLocation = geocodeResult.location; // Pega o objeto location
            
        } catch (errorStatus) {
            // Captura a rejeição do Geocoding
            if (errorStatus === "NOT_LOADED") {
                window.alert("O mapa ainda está carregando. Por favor, tente novamente em alguns segundos.");
            } else {
                window.alert("Endereço inválido! O Geocoding retornou status: " + errorStatus);
            }
            return;
        }

        // firebase register function
        if(password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // registrado com sucesso
                // Captura o objeto de usuário recém-criado
                const user = userCredential.user;

                // Registrando no firestore o UID, fullName, type
                firestoreSetNewUser(user.uid, firstName, lastName, email, buttonSelected, address, phoneNumber);

                // O usuário é automaticamente logado depois da sua conta criada
                if(buttonSelected === "f/center"){
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
    const registerButtonStyle = "w-1/2 h-10 ml-4 rounded-4xl font-bold cursor-pointer bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-200 text-md text-white";

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
            
                {/* Sign in box */}        
                <div className='grid ml-auto mr-auto items-center w-120 h-fit bg-white shadow-2xl rounded-sm p-8 space-y-2 text-md'>
                    <span className='flex'>
                        <span className='space-y-2'>
                            <h3 className='text-gray-500'>Nome</h3>
                            <span className={`
                                    flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                    ${isFirstNameFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                                }>
                                <input 
                                className={`w-full pl-4 focus:outline-none`} 
                                onFocus={() => setIsFirstNameFocused(true)} 
                                onBlur={() => setIsFirstNameFocused(false)} 
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                placeholder='e.g.Allan' />                            
                            </span>                            
                        </span> 
                        <span className='space-y-2 ml-4'>
                            <h3 className='text-gray-500'>Sobrenome</h3>
                            <span className={`
                                    flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                    ${isLastNameFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                                }>
                                <input 
                                className={`w-full pl-4 focus:outline-none`} 
                                onFocus={() => setIsLastNameFocused(true)} 
                                onBlur={() => setIsLastNameFocused(false)} 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                placeholder='e.g.Shinhama' />                            
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
                               <IoMdPerson className='text-gray-900/90 w-4'/>
                            </span>
                            <input 
                            className={`w-full pl-4 focus:outline-none`} 
                            onFocus={() => setIsEmailFocused(true)} 
                            onBlur={() => setIsEmailFocused(false)} 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='e.g.allanshinhama@gmail.com' />                            
                        </span>
                    </span> 
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Seu telefone</h3>
                        <span className={`
                                flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isPhoneNumberFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                               <FaPhoneAlt className='text-gray-900/90 w-4'/>
                            </span>
                            <input 
                            className={`w-full pl-4 focus:outline-none`} 
                            onFocus={() => SetIsPhoneNumberFocused(true)} 
                            onBlur={() => SetIsPhoneNumberFocused(false)} 
                            type="text" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            placeholder='14981624552' />                            
                        </span>
                    </span> 
                    <span className='space-y-2'>
                        <h3 className='text-gray-500'>Cadastre o endereço da seu posto/residência</h3>
                        <span className={`
                                flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                                ${isAdressFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                            }>
                            <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                               <PiAddressBookFill className='text-gray-900/90 w-5'/>
                            </span>
                            <input 
                            className={`w-full pl-4 focus:outline-none`} 
                            onFocus={() => setIsAddressFocused(true)} 
                            onBlur={() => setIsAddressFocused(false)} 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            placeholder='e.g.Av. Paulista, 1578, São Paulo, Brasil' />                            
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
                    <span className='flex h-10 mt-3'>
                        <span className='flex w-xs ml-auto mr-auto h-full p-1 space-x-1 rounded-xl text-xs bg-gray-200'>
                            <button onClick={() => setButtonSelected("f/center")} className={`${buttonClass}
                                ${buttonSelected === "f/center" ? buttonOnClass : buttonOffClass}`}>
                                <BsCameraVideo className='w-4'/>
                                <h4>F/Center</h4>
                            </button>
                            <button onClick={() => setButtonSelected("f/safe")} className={`${buttonClass} 
                                ${buttonSelected === "f/safe" ? buttonOnSafeClass : buttonOffClass}`}>
                                <FaUserShield className='w-4'/>
                                <h4>F/Safe</h4>
                            </button>
                        </span>
                        <button 
                            onClick={register}
                            disabled={!geocodingLibrary}
                            className={`${registerButtonStyle} ${!geocodingLibrary ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {geocodingLibrary ? 'Cadastrar' : 'Carregando Endereço...'}
                        </button>
                    </span>



                    <Link className="underline text-blue-700" to={"/login"}>Já cadastrou uma conta?</Link>
                    
                </div>    

                
            </div>

        </div>
    )
}

export default Register
