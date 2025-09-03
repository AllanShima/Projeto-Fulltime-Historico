import React from 'react'
import { BsCameraVideo } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { GoAlert } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import Avatar from './ui/Avatar';

const EventItem = ({ event }) => {
  const type = event.type;
  const emergency = (type == "assalto" || type == "incendio" || type == "socorro" || type == "acidente") ? true : false;
  return (
    <div className='flex items-center w-full h-20 rounded-xl bg-white border-1'>
      <span className='flex w-full h-10 text-primary items-center'>
        <span className={`flex ml-3 w-17 h-12 rounded-lg justify-center items-center text-xl ${emergency ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>
          {emergency ? <GoAlert/> : <IoIosInformationCircleOutline/>}
        </span>
        <span className='flex w-full h-fit items-center justify-between ml-3 mr-2'>
          <span className='text-sm'>
            <h1>{type == "assalto" ? "Assalto" : type == "incendio" ? "Incêndio" : type == "socorro" ? "Socorro" : type == "acidente" ? "Acidente" : "Infraestrutura"}</h1>
            <div className='text-xs text-gray-600 '>
              <span className='flex  items-center space-x-1'>
                <CiLocationOn/>
                <h3>{event.location}</h3>                              
              </span>
              <h3>{event.time}</h3>              
            </div>
          </span>
          <span className='text-xs w-10'>
            <Avatar name="Allan" last_name="Shinhama"/> 
          </span>
        </span>
      </span>
    </div>
  )
}

export default EventItem
