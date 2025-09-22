import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SidebarMonitor from './SidebarMonitor'
import HomeCam from './HomeCam'
import {cameras, events} from '../assets/data/TempData'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { useUserContext } from '../contexts/user-context'

const WindowMonitor = () => {

  const [selectedCam, setSelectedCam] = useState("1");

  // Uma nova array que exclui a camera selecionada
  const [remainingCams, setRemainingCams] = useState(cameras.filter(cam => cam.id !== selectedCam))
  const [user, loading, error] = useAuthState(auth);
  
  // Pra ter certeza de que user consegue carregar

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
