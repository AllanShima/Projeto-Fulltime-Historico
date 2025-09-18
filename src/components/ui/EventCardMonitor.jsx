import React, { useEffect, useState } from 'react'

// Event Alert Icons
import { GoAlert } from "react-icons/go"; // emergency
import { FaRegClock } from "react-icons/fa6"; // system
import { LuCctv } from "react-icons/lu"; // motion
import { FaRegEye } from "react-icons/fa"; // access

// Event info Icons
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import { CiClock1 } from "react-icons/ci";

import SoftwareIcon from './SoftwareIcon';
import ExportButton from './ExportButton';
import Avatar from './Avatar';

import getTimePassed from '../../assets/functions/GetTimePassed'; 

const typeSpecs = {
  "emergency": ["bg-orange-100 text-orange-800", GoAlert],
  "system": ["bg-gray-200 text-gray-800", FaRegClock],
  "motion": ["bg-blue-100 text-blue-800", LuCctv],
  "access": ["bg-green-100 text-green-800", FaRegEye],
}

const EventCard = ({ event, simplified }) => {
  const [timePassed, setTimePassed] = useState('');

  useEffect(() => {
    // Essa função vai ser executada a cada segundo
    const updateTime = () => {
      // Assuming event.date is a valid Date object or can be parsed
      const eventDate = new Date(event.date);
      const timeString = getTimePassed(eventDate);
      setTimePassed(`${timeString} atrás`);
    };

    // Call updateTime immediately when the component mounts
    updateTime();

    // Set up an interval to update the time every 10 seconds for better performance
    const intervalId = setInterval(updateTime, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [event.date]);

  // "emergency", "system", "motion", "access"
  const type = event.type;
  const colorClass = typeSpecs[type][0];

  const EventIconComponent = typeSpecs[type][1];

  if(!colorClass || !EventIconComponent) {
    console.error(`Tipo não foi passado corretamente: ${type}`);
    return null;
  }

  return (
    <div className='font-regular flex w-full h-fit rounded-xl bg-white border-1 border-gray-300'>
      <span className='flex w-full py-3 text-primary items-center'>
        <span className={`flex ml-3 w-12 h-full rounded-lg justify-center items-center text-xl ${colorClass}`}>
          <EventIconComponent/>
        </span>
        {/* Evento simplificado p sidebar */}
        {simplified ? (
          <span className='flex w-full h-fit items-center justify-between ml-3 mr-2'>
            <span className='text-sm space-y-1'>
              <h1>{event.title}</h1>
              <div className='text-xs text-gray-800 space-y-1'>
                <span className='flex  items-center space-x-1'>
                  <CiLocationOn/>
                  <h3>{event.location}</h3>                              
                </span>
                <h3>{timePassed}</h3>              
              </div>
            </span>
            <span className='w-8 text-xs pr-1'>
              {event.software_from === "F/Safe" ? <Avatar fullName={event.device}/> : <SoftwareIcon title={event.software_from} showTitle={false}/>}
            </span>
          </span>
        ) : (
          <span className='flex w-full h-full ml-3 mr-1 justify-between pr-3'>
            <span className='text-sm w-full space-y-2'>
              <h1 className='font-bold'>{event.title}</h1>
              <p className='text-xs text-gray-500'>{event.description}</p>
              <div className='text-xs w-5/6 text-gray-800 space-y-2'>
                <span className='flex w-full justify-between text-md'>
                  <span className='flex items-center space-x-1'>
                    <CiCalendar className='w-4 h-4'/>
                    <h3>{event.date.toString()}</h3>   
                    <li className='ml-5'><h3>{timePassed}</h3></li>                           
                  </span>
                  <span className='flex items-center space-x-1'>
                    <CiLocationOn className='w-4 h-4'/>
                    <h3>{event.location}</h3>                              
                  </span>
                  <span className='flex items-center space-x-1'>
                    <BsCameraVideo className='w-4 h-4'/>
                    <h3>{event.camera.name}</h3>                              
                  </span>
                </span>
 
                {event.video_available === true ? 
                (
                  <span className='flex w-1/4 pl-4 justify-between text-gray-500'>
                    <li><h3>Video Disponível</h3></li>
                    <h3>Tamanho: {event.video_recorded.size}</h3>  
                  </span>                    
                ) : null}
              </div>

            </span>
            <span className='flex flex-col text-xs w-fit h-full items-end justify-between'>
              <button>
                <ExportButton text="Exportar"/>
              </button>
              <span className='w-6'>
                {event.software_from === "F/Safe" ? <Avatar fullName={event.device}/> : <SoftwareIcon title={event.software_from} showTitle={false}/>}
              </span>
            </span>
          </span>
        )}
      </span>
    </div>
  )
}

export default EventCard
