import React from 'react'

const NotificationDetails = ({setModalState}) => {

    const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition"

    return (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
            <div className='grid content-between w-120 h-50 p-5 bg-white rounded-2xl font-regular'>
                <p className='text-center text-sm text-gray-600'>Insira seu Endereço exato do posto de Trabalho/Condomínio</p>
                <div className='flex justify-between px-10 w-full h-10'>
                <button className={`w-40 h-full rounded-lg text-white cursor-pointer ${hoverStyle1}`}>
                    Ok
                </button>
                <button onClick={() => setModalState(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                    Cancelar
                </button>
                </div>
            </div>
        </div>
    )
}

export default NotificationDetails
