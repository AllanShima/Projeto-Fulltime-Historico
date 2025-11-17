import React, { useState } from 'react'
import { PiAddressBookFill } from "react-icons/pi";
import { useUserContext } from '../contexts/user-context';

const UserSetAddressModal = ({setAddress, address, setShowAwaitModal, selectedAlertType}) => {
    const { userState, userDispatch } = useUserContext();
    const [isAdressFocused, setIsAddressFocused] = useState(false);
    const SetAlertWithCustomAddress = () => {
        setShowAwaitModal(true);
        firestoreSetAlertOnByUid(selectedAlertType, userState, userDispatch, address);
    }
      const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition"

  return (
    <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
      <div className='grid content-between w-120 h-50 p-5 bg-white rounded-2xl font-regular'>
        <h2 className='text-center font-bold'>
          Insira o seu endereço atual manualmente:
        </h2>
        <p className='text-center text-sm text-gray-600'>A precisão da localização do dispositivo foi de vários metros</p>
        <span className='space-y-2'>
            <h3 className='text-gray-500'>Cadastre seu Endereço</h3>
            <span className={`
                    flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                    ${isAdressFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                }>
                <span className='flex w-12 h-full items-center justify-center outline-r-1 text-gray-300'>
                   <PiAddressBookFill className='text-gray-900/90 w-5'/>
                </span>
                <input className={`w-full pl-4 focus:outline-none`} onFocus={() => setIsAddressFocused(true)} onBlur={() => setIsAddressFocused(false)} 
                type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='e.g.Av. Paulista, 1578, São Paulo, Brasil' />                            
            </span>
        </span> 
        <div className='flex justify-between px-10 w-full h-10'>
          <button onClick={SetAlertWithCustomAddress} className={`w-40 h-full rounded-lg text-white ${hoverStyle1}`}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSetAddressModal
