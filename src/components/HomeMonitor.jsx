import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import HomeCam from './HomeCam'
import Header from './Header'

const HomeMonitor = ({ currentTab }) => {
  const navigate = useNavigate();

  // totalTimeRecorded = tempo total de gravação da câmera
  const cameras = [
    { 
      id: "1", 
      name: "Câmera",
      location: "Entrada Principal",
      status: "online", 
      position: "top-left"
    },
    { 
      id: "2", 
      name: "Câmera 2", 
      location: "Andar do Escritório",
      status: "online", 
      position: "top-right"
    },
    { 
      id: "3", 
      name: "Câmera 3", 
      location: "Estacionamento",
      status: "online", 
      position: "bottom-left"
    },
    { 
      id: "4", 
      name: "Câmera 4", 
      location: "Saída de Incêndio",
      status: "offline", 
      position: "bottom-right"
    },
    { 
      id: "5", 
      name: "Câmera 5", 
      location: "Recepção",
      status: "online", 
      position: "center"
    },
    { 
      id: "6", 
      name: "Câmera 6", 
      location: "Sala do Servidor",
      status: "online", 
      position: "center-top"
    },
  ];

  // location será de acordo com o que o monitor colocar ao adicionar cameras
  // User vai depender do login
  // BS: O alerta só será ativado quando o usuário escolher a localização dele
  const events = [
    { id: "1", user: "Funcionário 1", location: "Entrada Principal", time: "há 2 min", type: "assalto" },
    { id: "2", user: "Proprietário 2", location: "Andar do Escritório", time: "5 min ago", type: "socorro" },
    { id: "3", user: "Gerente", location: "Entrada Principal", time: "há 10 min", type: "infraestrutura" },
    { id: "4", user: "Funcionário 2", location: "Entrada Principal", time: "há 15 min", type: "acidente" },
    { id: "5", user: "Funcionário 3", location: "Entrada Principal", time: "há 20 min", type: "incendio" },
    { id: "6", user: "Gerente", location: "Entrada Principal", time: "há 25 min", type: "socorro" },
  ];

  const [selectedCam, setSelectedCam] = useState("1");

  // Uma nova array que exclui a camera selecionada
  const [remainingCams, setRemainingCams] = useState(cameras.filter(cam => cam.id !== selectedCam))

  return (
    <>
      <Header/>
      <div className='flex flex-1 bg-white'>
        <Sidebar cameras={cameras} events={events} selectedCam={selectedCam} setSelectedCam={setSelectedCam} setRemainingCams={setRemainingCams}/>
        <HomeCam cameras={cameras} selectedCam={selectedCam} remainingCams={remainingCams}/>
      </div>    
    </>

  )
}

export default HomeMonitor
