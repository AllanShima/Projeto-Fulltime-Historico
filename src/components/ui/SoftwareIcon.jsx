import React from 'react'

import { FaBuildingShield } from "react-icons/fa6"; //FullCond
import { BiSolidCctv } from "react-icons/bi"; // fullcam
import { FaUserShield } from "react-icons/fa"; // fsafe
import { FaPersonRays } from "react-icons/fa6"; // F/Detect
import { BsFillHouseExclamationFill } from "react-icons/bs"; // FullArm

const icons = {
  "FullCond": FaBuildingShield,
  "FullCam": BiSolidCctv,
  "F/Safe": FaUserShield,
  "F/Detect": FaPersonRays,
  "FullArm": BsFillHouseExclamationFill
}

const softwareIcon = ({ title, showTitle=false }) => {
  const IconComponent = icons[title];

  if (!IconComponent){
    console.error(`There is no corresponding icon from the title passed down: ${title}`);

    // Não procede com o próximo return.
    return null;
  }
  
  return (
    <div className='flex items-center w-full h-full text-red-600'>
        <span className='w-10 rounded-lg outline-3 p-1 bg-white shadow-md'>
            <IconComponent className="w-full h-full"/>
        </span>            
        {showTitle === true ? <h2 className='pl-2 text-lg'>{title}</h2> : null}
    </div>
  )
}

export default softwareIcon
