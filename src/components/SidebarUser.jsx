import React, { useState } from 'react'
import { RiNotification3Line } from "react-icons/ri";
import { IoIosChatboxes } from "react-icons/io";
import EventCardUser from './ui/EventCardUser';

const SidebarUser = ({ userEvents }) => {
  const [activeTab, setActiveTab] = useState("cameras");
  return (
    <div className='w-1/2 h-full left-0 bg-gray-100 border-r-1 text-gray-300'>
      <div className='flex items-center justify-center w-full h-20 border-b-1'>
        <span className='flex w-9/10 h-fit p-1 space-x-1 rounded-xl text-sm bg-gray-200'>
            <button onClick={() => setActiveTab("notificacoes")} className={`flex space-x-2 w-full py-1 justify-center content-center items-center rounded-lg ${activeTab == "notificacoes" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <RiNotification3Line className='w-4'/>
                <h4>Notificações</h4>
            </button>
            <button onClick={() => setActiveTab("chat")} className={`flex space-x-2 w-full items-center justify-center content-center rounded-lg ${activeTab == "chat" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <IoIosChatboxes className='w-4'/>
                <h4>Live Chat</h4>
            </button>
        </span>
      </div>
      <div className='h-fit w-full p-4'>
        {activeTab == "notificacoes" ? (
          <div className='h-full'>
            <span className='justify-center text-primary'>
              <h1>Lista de Notificações ({userEvents.length})</h1>
            </span>   
            <div className='space-y-3 mt-3 overflow-y-scroll max-h-120'>
              {userEvents.map((event) => (
                <EventCardUser event={event}/>
              ))}          
            </div>
          </div>
        ) : (
          <div className='h-full'>
            <span className='justify-center text-primary'>
              <h1>Live Chat com o Monitor</h1>
            </span>   
            <div className='space-y-3 mt-3 overflow-y-scroll max-h-120'>
              <h1>Chat with operator</h1>            
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarUser
