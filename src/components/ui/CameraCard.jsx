import React, { useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import CameraStatusUi from './CameraStatusUi';

const CameraCard = ({ camera, selectedId }) => {
    const hoverClass = "hover:cursor-pointer hover:shadow-md transition duration-200";
    const selected = camera.id == selectedId ? "border-2 text-primary" : "border-1"

    return (
        <div className={`flex items-center w-full h-15 rounded-xl bg-white ${selected} ${hoverClass}`}>
            <span className='flex w-full h-10 text-primary'>
                {camera.imageUrl == null ? 
                    <span className='flex ml-3 w-14 rounded-lg justify-center items-center bg-gray-200'>
                        <BsCameraVideo/>
                    </span> : 
                    <span className='flex ml-3 w-14 rounded-lg justify-center items-center bg-gray-200'
                        style={{ 
                            backgroundImage: `url(${camera.imageUrl})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                    </span>
                }

                <span className='flex w-full items-center justify-between content-center ml-3 mr-3'>
                    <span className='text-sm space-y-1'>
                        <h1 className='w-fit'>{camera.name}</h1>
                        <span className='flex text-xs text-gray-600 items-center space-x-1'>
                            <CiLocationOn/>
                            <h3 className='text-left'>{camera.location}</h3>                              
                        </span>
                    </span>
                    <CameraStatusUi status={camera.status}/>
                </span>
            </span>
        </div>
    )
}

export default CameraCard