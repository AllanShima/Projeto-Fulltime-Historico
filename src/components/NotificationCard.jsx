import React, { useState } from 'react'
import SeverityIndicator from './ui/SeverityIndicator'
import RecordingIndicator from './ui/RecordingIndicator';

const NotificationCard = ({notification, setSelectedNotification, setShowResponseModal, setShowDetailsModal}) => {
  const titleOpt = {
    "INCÊNDIO": "Incêndio Detectado",
    "ALAGAMENTO": "Alagamento Detectado",
    "FURTO/ROUBO RESIDENCIAL": "Furto/Roubo Residencial",
    "EMERGÊNCIA MÉDICA": "Emergência Médica",
    "FALHA NA ILUMINAÇÃO": "Falha na Iluminação",
    "PÂNICO": "Ataque de Pânico",
    "CHUVAS SEVERAS": "Chuvas Severas",
    "VIOLÊNCIA DOMÉSTICA": "Violência Doméstica",
    "SUPERVISÃO": "Requer Supervisão"
  }
  const statTextOpt = {
    "critical": "Requer atenção imediada!",
    "high": "Requer atenção!",
    "medium": "Necessita de atenção",
    "low": "Requer pouca atenção"
  }
  const titleText = titleOpt[notification?.type] || "[Título não fornecido]";
  const status = notification?.status == "active" ? "Ativo" : "Inativo";
  const timestamp = notification?.date.toDate().toLocaleString();
  const statusTxt = statTextOpt[notification?.severity] || "Responda quando for possível"
  const [lowerDropdown, setLowerDropdown] = useState(false);

  const hoverStyle1 = "bg-linear-to-t from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 transition"

  const Response = () => {
    setSelectedNotification(notification);
    setShowResponseModal(true);
  }

  const Details = () => {
    setSelectedNotification(notification);
    setShowDetailsModal(true);
  }

  return (
    <span className='flex flex-col'>
      <button 
        className={`w-full h-fit p-5 bg-gray-50 hover:bg-white hover:cursor-pointer transition ${"rounded-xl"}`} 
        onClick={() => setLowerDropdown(!lowerDropdown)}
      >
        <div className='flex w-full'>
          <span className='flex w-full justify-between'>
            <h2 className='text-sm text-primary font-light'>{notification.title}</h2>
            <SeverityIndicator severity={notification.severity} layout2={true}/>
          </span>
        </div>  
      </button>    
      {lowerDropdown && (
        <div className='flex flex-col w-full p-5 h-fit rounded-xl bg-gray-50'>
          <span className='flex items-center mb-2'>
            <span>
              <RecordingIndicator/>
            </span>
            <h2 className='font-bold text-red-600 text-sm ml-3'>{titleText}</h2>
          </span>
          <ul className='text-xs space-y-1'>
            <li className='flex font-bold text-gray-500'>
              Local: <span className='flex ml-1'>{notification?.location}</span>
            </li>
            <li className='flex font-bold text-gray-500'>
              Horário: <span className='flex ml-1'>{timestamp}</span>
            </li>
            <li className='flex font-bold text-gray-500'>
              Status: <span className='flex ml-1'> {status} - {statusTxt}</span>
            </li>
          </ul>
          <div className='flex w-full h-7 mt-4 text-sm'>
            <button 
            onClick={Response}
            className={`w-1/2 h-full rounded-md text-white cursor-pointer ${hoverStyle1}`}>
              <p className='text-white'>
                Resolver
              </p>
            </button>
            <button 
            onClick={Details}
            className='w-1/2 h-full ml-3 bg-white outline-1 text-gray-300 rounded-md hover:bg-gray-100 transition'>
              <p className='text-primary'>
                Detalhes
              </p>
            </button>
          </div>
        </div>
      )}
    </span>
  )
}

export default NotificationCard
