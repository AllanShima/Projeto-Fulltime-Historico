import React from 'react'
import ToggleSwitch from './ToggleSwitch'
import { FaUserAlt } from "react-icons/fa";
import { BiSolidCctv } from "react-icons/bi";

const SettingsDropdown = ({ MenuOptions }) => {
  return (
    <div className='fixed z-30 flex flex-col mt-12 w-fit h-fit p-3 bg-gray-100 rounded-lg shadow-xl'>
      <ul>
        {MenuOptions.map((option, index) => (
          <li key={index}>
            <button onClick={() => option.setState(!option.state)} 
              className='w-full p-2 outline-1 text-gray-200 hover:bg-white font-regular text-sm hover:cursor-pointer rounded-sm transition duration-400'>
              <span className='flex items-center justify-between text-primary'>
                {option.id === "PFP" ? (
                  <span className='flex py-2 px-3 border-r-1 text-gray-600'>
                    <FaUserAlt/>
                  </span>
                ) : option.id === "VS" ? (
                  // Se o index for igual ao de "'L'ight and 'D'ark"
                  <span className='flex py-2 px-3 border-r-1 text-gray-600'>
                    <BiSolidCctv/>
                  </span>
                ) : (
                  <span>
                    <ToggleSwitch state={option.state}/>
                  </span>
                )}
                <span className='w-fit px-2 mr-auto ml-auto'>
                  {option.text}
                </span>
              </span>
            </button>       
            {(option.id === "VS" || option.id === "PFP") && (option.state) && (
              <div className='flex w-full h-fit p-2 text-xs'>
                <span className={`
                      flex items-center w-full h-8 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                      ${option.isFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                    }>
                    <input 
                      className={`w-full pl-4 focus:outline-none`} 
                      onFocus={() => option.setIsFocused(true)} 
                      onBlur={() => option.setIsFocused(false)} 
                      type="text" 
                      value={option.input} 
                      onChange={(e) => option.setInput(e.target.value)} 
                      placeholder={option.placeholder}
                    />                            
                </span>
                <div className='flex w-15 pl-2'>
                  <button 
                  className='flex w-full h-full outline-1 text-gray-400 font-light rounded-md justify-center items-center hover:cursor-pointer hover:bg-gray-200 transition'
                  onClick={option.function}
                  >
                    <p className='text-primary'>Set</p>
                  </button>
                </div>
              </div>              
            )}
          </li>
        ))}
      </ul>
    </div>              
  )
}

export default SettingsDropdown
