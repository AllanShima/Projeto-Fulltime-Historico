import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

const NewCameraModalComponent = ({setStateModal}) => {
    const setNewCamera = () => {

    }

  return (
    <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
      <div className='grid content-between w-fit h-fit bg-white rounded-2xl font-regular'>
        <span className='flex justify-end px-2 mt-2'>
          <button onClick={() => setStateModal(false)}>
            <span className='flex w-fit h-fit p-1 justify-center items-center rounded-full hover:bg-gray-200 transition'>
              <IoClose className='w-5 h-5 text-gray-400'/>              
            </span>
          </button>
        </span>
      </div>
    </div>
  )
}

export default NewCameraModalComponent
