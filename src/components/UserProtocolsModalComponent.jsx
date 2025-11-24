import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { AlertTextOptions } from './ui/UserProtocolTextOptions';

const UserProtocolsModalComponent = ({setSafetyProtocolsModal, selectedAlert}) => {
  const selectedAlertTextList = AlertTextOptions[selectedAlert?.type];
  return (
    <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
      <div className='grid content-between w-fit h-fit bg-white rounded-2xl font-regular'>
      <span className='flex justify-end px-2 mt-2'>
        <button onClick={() => setSafetyProtocolsModal(false)}>
          <span className='flex w-fit h-fit p-1 justify-center items-center rounded-full hover:bg-gray-200 transition'>
            <IoClose className='w-5 h-5 text-gray-400'/>              
          </span>
        </button>
      </span>
      {/* Alert Details */}
        <div className='grid w-fit h-fit items-center'>
          <div className="sm:max-w-[600px] pb-7 px-7">
            <div className='pb-3'>
              <div className="flex items-center gap-2">
                <FiAlertTriangle className="h-5 w-5 text-destructive text-red-600"/>
                <h1 className='text-primary font-bold'>{selectedAlert?.title}</h1>
              </div>
              <p className='text-xs text-gray-500 font-regular'>
                Prossiga com os procedimentos de segurança na espera de ajuda
              </p>
              <p className='text-xs text-gray-500 font-regular'>
                Sua localização: {selectedAlert?.location}
              </p>
            </div>
            <hr className='text-gray-500'/>
            <div className="space-y-4 pt-3">
              {/* Recommended Actions */}
              <div className="space-y-2">
                <h4 className="font-semibold text-md text-red-700">Protocolos de Segurança - {selectedAlert?.type}</h4>
                <ul className="space-y-1 text-sm max-h-[50vh] overflow-y-auto ">
                    {selectedAlertTextList.map((text, index) => (
                        <li key={index}>
                            • {text}
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProtocolsModalComponent
