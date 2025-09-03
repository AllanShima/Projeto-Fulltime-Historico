import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import HomeCam from './components/HomeCam'

const Home = () => {
  // totalTimeRecorded = tempo total de gravação da câmera
  const cameras = [
    { id: "1", name: "Câmera 1", image: "", location: "Entrada Principal", status: "online", totalTimeRecorded: "17:08:59" },
    { id: "2", name: "Câmera 2", image: "", location: "Andar do Escritório", status: "online", totalTimeRecorded: "12:08:59" },
    { id: "3", name: "Câmera 3", image: "", location: "Estacionamento", status: "online", totalTimeRecorded: "17:25:59" },
    { id: "4", name: "Câmera 4", image: "", location: "Saída de Incêndio", status: "offline", totalTimeRecorded: "12:08:59" },
    { id: "5", name: "Câmera 5", image: "", location: "Recepção", status: "online", totalTimeRecorded: "12:08:59" },
    { id: "6", name: "Câmera 6", image: "", location: "Sala do Servidor", status: "online", totalTimeRecorded: "19:08:59" },
  ];

  // location will be according what the user selects based on the cameras
  // User will be depending on the login
  // BS: Cameras need to be everywhere

  const events = [
    { id: "1", user: "Funcionário 1", location: "Entrada Principal", time: "há 2 min", type: "assalto" },
    { id: "2", user: "Proprietário 2", location: "Andar do Escritório", time: "5 min ago", type: "socorro" },
    { id: "3", user: "Gerente", location: "Entrada Principal", time: "há 10 min", type: "infraestrutura" },
    { id: "4", user: "Funcionário 2", location: "Entrada Principal", time: "há 15 min", type: "acidente" },
    { id: "5", user: "Funcionário 3", location: "Entrada Principal", time: "há 20 min", type: "incendio" },
    { id: "6", user: "Gerente", location: "Entrada Principal", time: "há 25 min", type: "socorro" },
  ];

  const [selectedCam, setSelectedCam] = useState("1");

  return (
    <>
      <Sidebar cameras={cameras} events={events} selectedCam={selectedCam} setSelectedCam={setSelectedCam}/>
      <HomeCam cameras={cameras} selectedCam={selectedCam}/>
    </>
  )
}

export default Home
