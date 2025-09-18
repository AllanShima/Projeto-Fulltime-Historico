import React, { useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import Avatar from "./ui/Avatar";
import { CiViewTimeline } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";

const Header = () => {
  const name = "Allan";
  const last_name = "Shinhama";
  const fullName = name + " " + last_name;

  const [activeTab, setActiveTab] = useState("cameras")

  return (
    <div className='grid grid-flow-col px-6 content-center items-center justify-between space-x-0 top-0 w-full h-15 border-b-1 text-gray-300'>
      {/* FullCenter logo */}
        <div className='flex content-center mt-auto mb-auto w-40 space-x-4'>
            <img src="./icon.png" alt="Fulltime logo" className='w-8 rounded-sm'/>
            <h1 className='mt-auto mb-auto font-regular text-primary'>
              FullCenter
            </h1>
        </div>
        <span className='flex w-90 h-fit p-1 space-x-1 rounded-xl text-sm bg-gray-200'>
            <button onClick={() => setActiveTab("cameras")} className={`flex space-x-2 w-full py-1 justify-center content-center items-center rounded-lg ${activeTab == "cameras" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <BsCameraVideo className='w-4'/>
                <h4>Câmeras</h4>
            </button>
            <button onClick={() => setActiveTab("events")} className={`flex space-x-2 w-full items-center justify-center content-center rounded-lg ${activeTab == "events" ? "bg-primary text-white transition duration-200" : "bg-gray-200 text-primary transition duration-200"}`}>
                <CiViewTimeline className='w-4'/>
                <h4>Histórico de Eventos</h4>
            </button>
        </span>
        <div className='grid grid-flow-col justify-end w-full text-primary'>
          <span className='grid grid-flow-col items-center self-end space-x-3'>
            <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
              <CiSettings/>
            </span>
            <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
              <RiNotification3Line/>
            </span>
            <span className='flex'>
              <Avatar name={name} last_name={last_name}/>
              <h3 className='pl-2 content-center'>{fullName}</h3>
            </span>
            <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
              <RxExit/>
            </span>          
          </span>
        </div>
    </div>
  )
}

export default Header