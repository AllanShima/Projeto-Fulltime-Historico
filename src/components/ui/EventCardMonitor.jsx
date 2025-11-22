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
import SeverityIndicator from './SeverityIndicator';

const typeSpecs = {
  "emergency": ["bg-orange-100 text-orange-800", GoAlert],
  "system": ["bg-gray-200 text-gray-800", FaRegClock],
  "motion": ["bg-blue-100 text-blue-800", LuCctv],
  "access": ["bg-green-100 text-green-800", FaRegEye],
}

const EventCardMonitor = ({ event, simplified, setStateModal, stateModal, setSelectedEvent }) => {

  // ⭐️ 1. GUARDA CONDICIONAL AQUI
  if (!event) {
    // Retorna nulo ou um componente de loading/placeholder se o evento não estiver carregado
    return null; 
  }

  const [timePassed, setTimePassed] = useState('');

  const setStates = () => {
    
    setSelectedEvent(event);
    setStateModal(!stateModal);
  }


  useEffect(() => {
    const updateTime = () => {
      let rawDate = event.date;

      // ⭐️ TRATAMENTO PARA TIMESTAMP DO FIRESTORE (seconds)
      if (rawDate && typeof rawDate === 'object' && rawDate.seconds) {
          rawDate = rawDate.seconds * 1000;
      }

      // Converte o valor final (milissegundos ou string ISO) para Date
      const eventDate = new Date(rawDate); 
      
      const timeString = getTimePassed(eventDate);
      setTimePassed(`${timeString} atrás`);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 10000);

    return () => clearInterval(intervalId);
  }, [event.date]); // Mantenha a dependência

  // "emergency", "system", "motion", "access"
  const type = event?.style;

  const colorClass = typeSpecs[type]?.[0];
  const EventIconComponent = typeSpecs[type]?.[1];

  if(!colorClass || !EventIconComponent) {
    console.error(`Tipo não foi passado corretamente: ${type}`);
    return null;
  }

  // ⭐️ NOVA LÓGICA DE TRATAMENTO DE DATA (Para ser usada no retorno)
  let rawDate = event.date;
  if (rawDate && typeof rawDate === 'object' && rawDate.seconds) {
      rawDate = rawDate.seconds * 1000;
  }
  const eventDate = new Date(rawDate); // eventDate é agora um objeto Date

    // ⭐️ NOVA LÓGICA DE TRATAMENTO DE DATA (Para ser usada no retorno)
    let startDate = event.date;
    if (startDate && typeof startDate === 'object' && startDate.seconds) {
        startDate = startDate.seconds * 1000;
    }
    const eventStartDate = new Date(startDate); // eventDate é agora um objeto Date
    // ⭐️ STRING DE DATA FORMATADA + HORA (Dia, Mês, Ano) (Hora e Minuto)
    const formattedStartDate = eventStartDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedStartTime = eventStartDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let endDate = event.finished;
    if (endDate && typeof endDate === 'object' && endDate.seconds) {
        endDate = endDate.seconds * 1000;
    }
    const eventEndDate = new Date(endDate); // eventDate é agora um objeto Date

    const formattedEndDate = eventEndDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedEndTime = eventEndDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const totalDuration = new Date(endDate - startDate);

    const formattedDuration = totalDuration.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

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
                <span className='flex w-50 items-center space-x-1'>
                  <span><CiLocationOn/></span>
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
                    <h3>{formattedEndDate}</h3>   
                    <li className='ml-5'><h3>{timePassed}</h3></li>                           
                  </span>
                  <span className='flex items-center space-x-1'>
                    <CiLocationOn className='w-4 h-4'/>
                    <h3>{event.location}</h3>                              
                  </span>
                  <span className='flex items-center space-x-1'>
                    <BsCameraVideo className='w-4 h-4'/>
                    <h3>{formattedDuration}</h3>                              
                  </span>
                </span>
 

                <span className='flex w-1/4 pl-4 justify-between text-gray-500'>
                  {event.video_available ? (
                    <li>
                      <h3>Video Disponível</h3>
                      <h3>Tamanho: {event?.video_recorded}</h3>  
                    </li>
                  ) : (
                    <li>
                      <h3>Video não disponível</h3>
                    </li>
                  )}
                </span>                    
              </div>

            </span>
            <span className='flex flex-col text-xs w-fit h-full items-end justify-between'>
              <span className='flex'>
                <span className='flex w-full h-full mr-3'>
                  <SeverityIndicator severity={event.severity} layout2={false}/>
                </span>
                <button onClick={setStates}>
                  <ExportButton text="Exportar"/>
                </button>
              </span>
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

export default EventCardMonitor
