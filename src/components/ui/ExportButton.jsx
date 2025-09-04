import React from 'react'
import { MdOutlineFileDownload } from "react-icons/md";

const ExportButton = ({text}) => {
  return (
    <div className='border-1 rounded-lg text-gray-300 w-fit h-fit px-3 py-1'>
        <span className='text-primary flex items-center space-x-3'>
            <span className='w-4 h-4'><MdOutlineFileDownload/></span>
            <h3 className=''>{text}</h3>            
        </span>

    </div>
  )
}

export default ExportButton
