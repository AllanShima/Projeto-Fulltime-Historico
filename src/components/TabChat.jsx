import React, { useEffect, useState } from 'react'
import ChatItem from './ui/ContactItem'
import LiveChatComponent from './LiveChatComponent';
import GoogleMapsComponent from './GoogleMapsComponent';
import { firestoreGetAllCurrentAlerts, firestoreGetContacts } from '../services/api/FirebaseGetFunctions';

const TabChat = () => {
    const [selectedUserContact, setSelectedUserContact] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);

    const [buttonClick, setButtonClick] = useState(false);

    // ... useEffect para carregar currentEvents (mantido como está) ...
    useEffect(() => {
        console.log(selectedUserContact)
        const handleCurrentEvents = async() => {
            setCurrentEvents(await firestoreGetAllCurrentAlerts())
        }
        handleCurrentEvents()
        
    }, [])


    return (
        <div className='flex flex-1 w-full h-full'>
            {/* Sidebar */}
            <div className='w-1/2'>
                <LiveChatComponent monitoring={true} setSelectedUserContact={setSelectedUserContact} setButtonClick={setButtonClick}/>
            </div>

            {/* Google maps  */}
            {buttonClick ? (
                <div className='w-1/2 h-full'>
                    <GoogleMapsComponent selectedAddress={currentEvents[0]?.location}/>
                </div>
            ) : (
                <div className='w-1/2 h-full'>
                    <GoogleMapsComponent selectedAddress={selectedUserContact?.location}/>
                </div>
            )}

            {currentEvents.length >= 1 && (
                <button 
                onClick={() => setButtonClick(true)}
                className='flex justify-center fixed w-fit bottom-0 right-0 bg-red-400 text-white font-bold text-sm p-4 rounded-2xl shadow-lg z-50 mr-3 mb-3 hover:cursor-pointer hover:bg-red-500 transition'>
                    Mostrar Localização do Alerta
                </button>                
            )}
        </div>
    )
}

export default TabChat
