import React, { useState } from 'react'
import { PiAddressBookFill } from "react-icons/pi";
import { useUserContext } from '../contexts/user-context';
import { firestoreSetAlertOnByUid } from '../services/api/FirebaseSetFunctions';

const UserSetAddressModal = ({setAddress, address, setShowAwaitModal, selectedAlertType, setThisModal}) => {
    const { userState, userDispatch } = useUserContext();
    const [isAdressFocused, setIsAddressFocused] = useState(false);
    const SetAlertWithCustomAddress = () => {
        firestoreSetAlertOnByUid(selectedAlertType, userState, userDispatch, address);
        setShowAwaitModal(true);
        setThisModal(false);
    }
      const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition"

  return (
    <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
      <div className='grid content-between w-120 h-fit p-5 bg-white rounded-2xl font-regular'>
        <h2 className='text-left font-bold'>
          Insira o seu endereço atual manualmente:
        </h2>
        <p className='text-left text-sm text-gray-600 pb-3'>
            A precisão da localização do dispositivo foi de vários metros
        </p>
        <hr className='text-gray-400 pb-3'/>
        <span className='flex'>
            <span className={`
                    flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                    ${isAdressFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                }>
                <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsAddressFocused(true)} onBlur={() => setIsAddressFocused(false)} 
                type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='e.g.Av. Paulista, 1578, São Paulo, Brasil' />                            
            </span>
            <span className='flex justify-center px-2 h-10'>
                <button onClick={SetAlertWithCustomAddress} className={`w-20 h-full rounded-lg text-white ${hoverStyle1}`}>
                    Enviar
                </button>
            </span>
        </span> 
      </div>
    </div>
  )
}

export default UserSetAddressModal
