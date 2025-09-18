import React from 'react'
import { FaEye } from "react-icons/fa";

const ViewButton = ({text}) => {
  const hoverClass = "hover:bg-gray-200 transition duration-100"
  return (
    <div className={`border-1 rounded-lg bg-white text-gray-300 w-fit h-fit px-3 py-1 ${hoverClass}`}>
        <span className='text-primary text-md flex items-center space-x-3'>
            <span className='w-3 h-3'><FaEye/></span>
            <h3>{text}</h3>            
        </span>
    </div>
  )
}

export default ViewButton
