import React from 'react'
import ToggleSwitch from './ToggleSwitch'
import { FaMapMarkedAlt } from 'react-icons/fa'

const SettingsDropdown = ({ MenuOptions }) => {
  return (
    <div className='fixed z-30 flex flex-col mt-12 w-fit h-fit p-3 bg-gray-100 rounded-lg shadow-xl'>
      <ul>
        {MenuOptions.map((option, index) => (
          <li key={index}>
            <button onClick={() => option.setState(!option.state)} 
              className='w-full p-2 outline-1 text-gray-200 hover:bg-white font-regular text-sm hover:cursor-pointer rounded-sm transition duration-400'>
              <span className='flex items-center justify-between text-primary'>
                {option.id === "AD" ? (
                  <span className='flex py-2 px-3 border-r-1 text-gray-600'>
                    <FaMapMarkedAlt/>
                  </span>
                ) : (
                  // Se o index for igual ao de "'L'ight and 'D'ark"
                  <span>
                    <ToggleSwitch state={option.state}/>
                  </span>
                )}
                <span className='w-fit px-2 mr-auto ml-auto'>
                  {option.text}
                </span>
              </span>
            </button>                    
          </li>
        ))}
      </ul>
    </div>              
  )
}

export default SettingsDropdown
