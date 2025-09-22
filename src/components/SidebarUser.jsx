import React, { useState } from 'react'
import { RiNotification3Line } from "react-icons/ri";
import { IoIosChatboxes } from "react-icons/io";
import EventCardUser from './ui/EventCardUser';

const SidebarUser = ({ userEvents }) => {
  const [activeTab, setActiveTab] = useState("notification");
  return (
    <div className='flex flex-col left-0 bg-gray-100 border-r-1 text-gray-300'>
      <div className='flex items-center justify-center ml-4 w-full h-20 border-b-1'>
        <span className='flex w-100 h-fit p-1 space-x-1 rounded-xl text-sm bg-gray-200'>
            <button onClick={() => setActiveTab("notification")} className={`flex space-x-2 w-full py-1 justify-center content-center items-center rounded-lg ${activeTab == "notification" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <RiNotification3Line className='w-4'/>
                <h4>Notificações</h4>
            </button>
            <button onClick={() => setActiveTab("chat")} className={`flex space-x-2 w-full items-center justify-center content-center rounded-lg ${activeTab == "chat" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <IoIosChatboxes className='w-4'/>
                <h4>Live Chat</h4>
            </button>
        </span>
      </div>
      <div className='flex flex-col flex-1 w-full pl-4 pt-4'>
        {activeTab == "notification" ? (
          <div className='flex flex-col max-h-135 w-full'>
            <span className='justify-center text-primary'>
              <h1>Lista de Notificações ({userEvents.length})</h1>
            </span>   
            <div className='flex-1 w-full mt-4 justify-between overflow-y-auto'>
              <div className='w-full pr-4 space-y-3'>
                {userEvents.map((event) => (
                  <EventCardUser key={event.id} event={event}/>
                ))}          
              </div>           
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
