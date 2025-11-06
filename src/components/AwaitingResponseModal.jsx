import React, { useState } from 'react'
import ThreeDotLoading from './ui/ThreeDotLoading';

const AwaitingResponseModal = ({selectedAlert}) => {
    return (
        <div className='fixed flex w-full h-15 justify-center items-center top-0 bg-black/50 z-20'>
            <div className='flex justify-between w-full h-full p-5 bg-red-600 font-regular'>
                <span className='flex'>
                    <h2 className='text-center font-bold text-white'>
                        Alerta de
                        <span className='px-1.5'>{selectedAlert.title}</span>
                        Ativado! Aguardando resposta do monitor
                    </h2>
                    <span className='text-white font-bold text-regular'>
                        <ThreeDotLoading/>
                    </span>                    
                </span>
                
                <p className='text-center text-sm text-gray-200'>
                    Fique atento às notificações!
                    O que fazer no aguardo?
                    <a href="/" className='text-blue-500 ml-2'>Ler Mais</a>
                </p>
            </div>
        </div>
    )
}

export default AwaitingResponseModal
