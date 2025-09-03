import React from 'react'
import { CiSettings } from "react-icons/ci";

import { RxExit } from "react-icons/rx";
import Avatar from "./ui/Avatar";

const Header = () => {
  const name = "Allan";
  const last_name = "Shinhama";
  const fullName = name + " " + last_name;

  return (
    <div className='grid grid-flow-col px-6 content-center items-center space-x-0 top-0 w-full h-15 border-b-1 text-gray-300'>
      {/* FullCenter logo */}
        <div className='flex content-center mt-auto mb-auto w-40 space-x-4'>
            <img src="./icon.png" alt="Fulltime logo" className='w-8 rounded-sm'/>
            <h1 className='mt-auto mb-auto font-regular text-primary'>
              FullCenter
            </h1>
        </div>
        <div className='grid grid-flow-col justify-end w-full text-primary'>
          <span className='grid grid-flow-col items-center self-end space-x-4'>
            <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
              <CiSettings/>
            </span>
            <span className='flex'>
              <Avatar name={name} last_name={last_name}/>
              <h3 className='pl-2 content-center'>{fullName}</h3>
            </span>
            <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
              <RxExit/>
            </span>          
          </span>
        </div>
    </div>
  )
}

export default Header