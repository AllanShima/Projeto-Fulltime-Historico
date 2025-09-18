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
import ViewButton from './ViewButton';

// message, help, forms, report, camera, alert
const typeSpecs = {
  "message": ["bg-orange-100 text-orange-800", GoAlert],
  "help": ["bg-gray-200 text-gray-800", FaRegClock],
  "forms": ["bg-blue-100 text-blue-800", LuCctv],
  "report": ["bg-green-100 text-green-800", FaRegEye],
  "camera": ["bg-green-100 text-green-800", FaRegEye],
  "alert": ["bg-green-100 text-green-800", FaRegEye],
}

const EventCardUser = ({ event }) => {
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

  // message, help, forms, report, camera, alert
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
                    {/* <h3>{event.camera.location}</h3>                               */}
                  </span>
                  {/* <span className='flex items-center space-x-1'>
                    <BsCameraVideo className='w-4 h-4'/>
                    <h3>{event.camera.name}</h3>                              
                  </span> */}
                </span>

              </div>

            </span>
            <span className='flex flex-col text-xs w-fit h-full items-end justify-between'>
              {event.show_button ? (
                <button>
                  <ViewButton text="Visualizar"/>
                </button>
              ) : null}
            </span>
          </span>
      </span>
    </div>
  )
}

export default EventCardUser
