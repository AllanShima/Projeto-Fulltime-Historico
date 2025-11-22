import React from 'react'

import { FaBuildingShield } from "react-icons/fa6"; //FullCond
import { BiSolidCctv } from "react-icons/bi"; // fullcam
import { FaUserShield } from "react-icons/fa"; // fsafe
import { FaPersonRays } from "react-icons/fa6"; // F/Detect
import { BsFillHouseExclamationFill } from "react-icons/bs"; // FullArm

const iconsOpt = {
  "fullcond": [FaBuildingShield, "FullCond"],
  "fullcam": [BiSolidCctv, "FullCam"],
  "f/safe": [FaUserShield, "F/Safe"],
  "f/detect": [FaPersonRays, "F/Detect"],
  "fullarm": [BsFillHouseExclamationFill, "FullArm"],
}

const SoftwareIcon = ({ title, showTitle=false }) => {
  const lower = title.toLowerCase();

  const iconData = iconsOpt[lower];
  // Define o componente de ícone real ou um ícone de fallback.
  const IconComponent = iconData && iconData.length > 0
    ? iconData[0] : BiSolidCctv; // Fallback Icon

  if (!IconComponent && title !== "FullCenter"){
    console.error(`There is no corresponding icon from the title passed down: ${title}`);
    // Não procede com o próximo return.
    return null;
  }

  const realTitle = title !== "FullCenter" ? iconData?.[1] : "FullCenter";
  
  return (
    <div className='flex items-center w-full h-full text-red-600'>
      {realTitle === "FullCenter" ? (
        <>
          <span className='w-10'>
            <img src="/icon.png" alt="Fulltime logo" className='w-full rounded-lg shadow-md'/>
          </span>            
          {showTitle === true ? <h2 className='pl-2 text-lg font-bold'>{realTitle}</h2> : null} 
        </>

      ) : (
        <>
          <span className='w-10 rounded-lg outline-3 p-1 bg-white shadow-md'>
            <IconComponent className="w-full h-full"/>
          </span>            
          {showTitle === true ? <h2 className='pl-2 text-lg font-regular'>{realTitle}</h2> : null} 
        </>
      )}

    </div>
  )
}

export default SoftwareIcon
