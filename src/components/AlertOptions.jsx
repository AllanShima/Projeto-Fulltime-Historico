// Esse file vai conter os botões dos eventos

import React, { useState } from 'react'

import { FaFire } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { FaHouseFloodWater } from "react-icons/fa6";
import { BsHouseExclamationFill } from "react-icons/bs";
import { FaLightbulb } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { IoRainy } from "react-icons/io5";
import { PiHandPalmFill } from "react-icons/pi";
import { FaSearchLocation } from "react-icons/fa";

import { GoAlert } from "react-icons/go";

const userAlerts = [
  {
    title: "INCÊNDIO",
    icon: FaFire
  },
  {
    title: "ALAGAMENTO",
    icon: FaHouseFloodWater
  },
  {
    title: "FURTO/ROUBO RESIDENCIAL",
    icon: BsHouseExclamationFill
  },
  {
    title: "EMERGÊNCIA MÉDICA",
    icon: FaHeartbeat
  },
  {
    title: "FALHA NA ILUMINAÇÃO",
    icon: FaLightbulb
  },
  {
    title: "PÂNICO",
    icon: IoMdAlert
  },
  {
    title: "CHUVAS SEVERAS",
    icon: IoRainy
  },
  {
    title: "VIOLÊNCIA DOMÉSTICA",
    icon: PiHandPalmFill
  },
  {
    title: "SUPERVISÃO",
    icon: FaSearchLocation
  },
];

const AlertOptions = ({ setSelectedAlert, setShowModal, isLoading}) => {
  const setAlert = (alert) => {
    if (!isLoading){
      setShowModal(true); 
      setSelectedAlert(alert);      
    } else{
      window.alert("Alerta em andamento!")
    }
  }
  return (
    <div className='p-6 w-full h-full'>
      <div className='flex p-4 w-full h-full items-center justify-center bg-gray-100 rounded-2xl shadow-lg'>
        <ul className='grid grid-flow-col items-center grid-cols-3 grid-rows-3 h-120 w-120'>
          {userAlerts.map((alert, index) => {
            const IconComponent = alert.icon;
            // key é crucial para a melhor performance e funcionamento do react.
            return (
              <li key={index} className='ml-auto mr-auto w-30 h-30 rounded-2xl shadow-md bg-gray-200'>
                <button onClick={() => setAlert(alert)} className='w-full h-full hover:cursor-pointer'>
                  <div className='relative flex flex-col justify-center items-center w-full h-full'>
                    <IconComponent className='w-10 h-10 mb-2'/>
                    <span className='text-center font-bold text-xs'>{alert.title}</span>
                    {/* Pra esconder com o hover */}
                    <span className='absolute grid items-center justify-center w-full h-full rounded-2xl opacity-0 hover:opacity-90 bg-gray-300/90 transition duration-200'>
                      <GoAlert className='w-13 h-13 text-red-500'/>
                    </span>                  
                  </div>                  
                </button>
              </li>              
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default AlertOptions
