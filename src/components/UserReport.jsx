import React from 'react'

const UserReport = () => {
  return (
    <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
        <div className='grid content-between w-120 h-50 p-5 bg-white rounded-2xl font-regular'>
            <p className='text-center text-sm text-gray-600'>Insira seu Endereço exato do posto de Trabalho/Condomínio</p>
            <div className='flex justify-between px-10 w-full h-10'>
            {/* <button onClick={storeAlertSignal} className={`w-40 h-full rounded-lg text-white ${hoverStyle1}`}>
                SIM!
            </button>
            <button onClick={() => setShowAlertModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                Cancelar
            </button> */}
            </div>
        </div>
    </div>
  )
}

export default UserReport
