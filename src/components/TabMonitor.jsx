import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import HomeCam from './HomeCam'

const TabMonitor = () => {

  // totalTimeRecorded = tempo total de gravação da câmera
  const cameras = [
    { 
      id: "1", 
      name: "Câmera 1", 
      imageUrl: "https://images.unsplash.com/photo-1646521790482-a76619a564db?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      location: "Entrada Principal", 
      status: "online", 
      totalTimeRecorded: "17:08:59" 
    },
    { 
      id: "2", 
      name: "Câmera 2", 
      imageUrl: "https://images.unsplash.com/photo-1716703435417-f8687d87516c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      location: "Andar do Escritório", 
      status: "online", 
      totalTimeRecorded: "12:08:59" 
    },
    { 
      id: "3", 
      name: "Câmera 3", 
      imageUrl: "https://images.unsplash.com/photo-1590938076771-dfe17af4d484?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      location: "Estacionamento", 
      status: "online", 
      totalTimeRecorded: "17:25:59" 
    },
    { 
      id: "4", 
      name: "Câmera 4", 
      imageUrl: "https://images.unsplash.com/photo-1647451969544-2e0db88a150b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      location: "Saída de Incêndio", 
      status: "offline", 
      totalTimeRecorded: "12:08:59" 
    },
    { 
      id: "5", 
      name: "Câmera 5", 
      imageUrl: "https://plus.unsplash.com/premium_photo-1676320103087-4aec0a09088f?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      location: "Recepção", 
      status: "online", 
      totalTimeRecorded: "12:08:59" 
    },
    { 
      id: "6", 
      name: "Câmera 6", 
      imageUrl: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?q=80&w=1273&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      location: "Sala do Servidor", 
      status: "online", 
      totalTimeRecorded: "19:08:59" 
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
      <div className='flex flex-1 bg-white'>
        <Sidebar cameras={cameras} events={events} selectedCam={selectedCam} setSelectedCam={setSelectedCam} setRemainingCams={setRemainingCams}/>
        <HomeCam cameras={cameras} selectedCam={selectedCam} remainingCams={remainingCams}/>
      </div>    
    </>

  )
}

export default TabMonitor
