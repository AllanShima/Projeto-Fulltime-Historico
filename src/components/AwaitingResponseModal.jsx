import React, { useState } from 'react'
import ThreeDotLoading from './ui/ThreeDotLoading';
import UserProtocolsModalComponent from './UserProtocolsModalComponent';


const AwaitingResponseModal = ({selectedAlert, alertVisualized}) => {
    const [safetyProtocolsModal, setSafetyProtocolsModal] = useState(false);

    const text = selectedAlert?.type || selectedAlert;

    console.log(selectedAlert);
    return (
        <>
            {safetyProtocolsModal && selectedAlert && (
                <UserProtocolsModalComponent setSafetyProtocolsModal={setSafetyProtocolsModal} selectedAlert={selectedAlert}/>
            )}
            <div className='fixed flex w-full h-15 justify-center items-center top-0 bg-black/50 z-20'>
                <div className='flex justify-between w-full h-full p-5 bg-red-600 font-regular'>
                    {!alertVisualized ? (
                        <>
                            <span className='flex'>
                                <h2 className='text-center font-bold text-white'>
                                    Alerta de
                                    <span className='px-1.5'>{text}</span>
                                    Ativado! Aguardando resposta do monitor
                                </h2>
                                <span className='text-white font-bold text-regular'>
                                    <ThreeDotLoading/>
                                </span>                    
                            </span>
                            
                            <p className='text-center text-sm text-gray-200'>
                                Fique atento às notificações/chat!
                                Leia os
                                <button 
                                onClick={() => setSafetyProtocolsModal(true)}
                                className='text-blue-500 ml-2 hover:cursor-pointer'
                                >
                                    Protocolos de Segurança
                                </button>
                            </p>                       
                        </>
                    ) : (
                        // Alerta foi visualizado pelo monitor
                        <>
                            <span className='flex'>
                                <h2 className='text-center font-bold text-white'>
                                    Alerta de
                                    <span className='px-1.5'>{text}</span>
                                    Visualizado por monitor! Ajuda está a caminho!
                                </h2>
                                <span className='text-white font-bold text-regular'>
                                    <ThreeDotLoading/>
                                </span>                    
                            </span>
                            
                            <p className='text-center text-sm text-gray-200'>
                                Fique atento às notificações/chat!
                                Leia os
                                <button 
                                onClick={() => setSafetyProtocolsModal(true)}
                                className='text-blue-500 ml-2 hover:cursor-pointer'
                                >
                                    Protocolos de Segurança
                                </button>
                            </p>   
                        </>
                    )}

                </div>
            </div>        
        </>

    )
}

export default AwaitingResponseModal
