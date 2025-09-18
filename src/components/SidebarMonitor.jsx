import React, { useEffect, useState } from 'react'
import { BsCameraVideo } from "react-icons/bs";
import { GoAlert } from "react-icons/go";

import CameraCard from './ui/CameraCard'
import EventCard from './ui/EventCardMonitor';

const SidebarMonitor = ({cameras, events, selectedCam, setSelectedCam, setRemainingCams}) => {

  const [activeTab, setActiveTab] = useState("cameras");

  return (
    <div className='w-120 h-full left-0 bg-gray-100 border-r-1 text-gray-300'>
      <div className='flex items-center justify-center w-full h-20 border-b-1'>
        <span className='flex w-9/10 h-fit p-1 space-x-1 rounded-xl text-sm bg-gray-200'>
            <button onClick={() => setActiveTab("cameras")} className={`flex space-x-2 w-full py-1 justify-center content-center items-center rounded-lg ${activeTab == "cameras" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <BsCameraVideo className='w-4'/>
                <h4>Câmeras</h4>
            </button>
            <button onClick={() => setActiveTab("events")} className={`flex space-x-2 w-full items-center justify-center content-center rounded-lg ${activeTab == "events" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <GoAlert className='w-4'/>
                <h4>Eventos</h4>
            </button>
        </span>
      </div>
      <div className='h-fit w-full p-4'>
        {activeTab == "cameras" ? (
          <div className='h-full'>
            <span className='justify-center text-primary'>
              <h1>Camera List ({cameras.filter(c => c.status == "online").length} online)</h1>
            </span>   
            <div className='space-y-3 mt-3 overflow-y-scroll max-h-120'>
              {cameras.map(camera => (
                <button key={camera.id} onClick={() => {
                    setSelectedCam(camera.id)
                    setRemainingCams(cameras.filter(cams => cams.id !== camera.id))
                  }} className='w-full'>
                  <CameraCard camera={camera} selectedId={selectedCam}/>                  
                </button>
              ))}              
            </div>
          </div>
        ) : (
          <div className='h-full'>
            <span className='justify-center text-primary'>
              <h1>Event List ({events.length})</h1>
            </span>   
            <div className='space-y-3 mt-3 overflow-y-scroll max-h-120'>
              {events.map(event => 
                <EventCard key={event.id} event={event} simplified={true}/>                
              )}              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarMonitor