import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import SidebarMonitor from './SidebarMonitor'
import HomeCam from './HomeCam'
import {cameras, events} from '../assets/data/TempData'

const WindowMonitor = () => {

  const [selectedCam, setSelectedCam] = useState("1");

  // Uma nova array que exclui a camera selecionada
  const [remainingCams, setRemainingCams] = useState(cameras.filter(cam => cam.id !== selectedCam))

  return (
    <>
      <div className='flex flex-1 bg-white'>
        <SidebarMonitor cameras={cameras} events={events} selectedCam={selectedCam} setSelectedCam={setSelectedCam} setRemainingCams={setRemainingCams}/>
        <HomeCam cameras={cameras} selectedCam={selectedCam} remainingCams={remainingCams}/>
      </div>    
    </>

  )
}

export default WindowMonitor
