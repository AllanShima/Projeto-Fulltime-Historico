import React, { useState } from 'react'
import { BsCameraVideo } from 'react-icons/bs';
import { FaCheck, FaUserShield } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi'
import { IoIosArrowDown, IoMdPerson } from 'react-icons/io';
import { IoClose } from 'react-icons/io5'
import { firestoreSetNewCamera } from '../services/api/FirebaseSetFunctions';

  // imageUrl: 'https://www.shutterstock.com/shutterstock/videos/3535492853/thumb/1.jpg?ip=x480',
  // name: "Câmera 5",
  // location: "Recepção",
  // status: "online",
  // position: "center"

const NewCameraModalComponent = ({setStateModal}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isUrlFocused, setIsUrlFocused] = useState(false);
  const [cameraName, setCameraName] = useState('');
  const [isCameraNameFocused, setIsCameraNameFocused] = useState(false);
  const [cameraAddress, setCameraAddress] = useState('');
  const [isCameraAddressFocused, setIsCameraAddressFocused] = useState(false);

  const [statusSelected, setStatusSelected] = useState('online');

  const [cameraPosDropdown, setCameraPosDropdown] = useState(false);
  const [selectedCameraPos, setSelectedCameraPos] = useState('top-left');

  const CameraPositions = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'center'
  ]
  
  const setNewCamera = () => {
    const image = imageUrl == '' ? null : imageUrl;
    const cameraData = {
      imageUrl: image,
      name: cameraName,
      location: cameraAddress,
      status: statusSelected,
      position: selectedCameraPos
    }
    firestoreSetNewCamera(cameraData);
    setStateModal(false);
  }

  const buttonClass = "flex space-x-2 w-full py-1 cursor-default justify-center content-center items-center rounded-lg";
  const buttonOnClass = "bg-primary text-white transition duration-200";
  const buttonOnSafeClass = "bg-red-700 text-white transition duration-200";
  const buttonOffClass = "bg-gray-200 text-primary transition duration-200";

  return (
    <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
      <div className='grid content-between w-fit h-fit bg-white rounded-2xl font-regular p-5'>
        <span className='flex justify-end items-center p-2'>
          <h1 className='font-semibold text-xl text-primary w-full'>Configurar Nova Câmera</h1>
          <button onClick={() => setStateModal(false)}>
            <span className='flex w-fit h-fit p-1 justify-center items-center rounded-full hover:bg-gray-200 transition'>
              <IoClose className='w-5 h-5 text-gray-400'/>              
            </span>
          </button>
        </span>
        <hr className='text-gray-400'/>
        <div className='flex flex-col p-2 space-y-4'>
          <span className='space-y-2'>
            <h3 className='text-gray-500'>URL de Imagem (opcional)</h3>
            <span className={`flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                    ${isUrlFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                }>
                <input className={`w-full pl-4 focus:outline-none`} 
                onFocus={() => setIsUrlFocused(true)} onBlur={() => setIsUrlFocused(false)} 
                type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder='e.g.https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOvDHOqhHRC1sZdBse6drFXgyqsFCfh5BFhQ&s' />                            
            </span>
          </span> 
          <span className='space-y-2'>
            <h3 className='text-gray-500'>Nome da nova câmera</h3>
            <span className={`flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                    ${isCameraNameFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                }>
                <input className={`w-full pl-4 focus:outline-none`} 
                onFocus={() => setIsCameraNameFocused(true)} onBlur={() => setIsCameraNameFocused(false)} 
                type="text" value={cameraName} onChange={(e) => setCameraName(e.target.value)} placeholder='e.g.Camera_1' />                            
            </span>
          </span> 
          <span className='space-y-2'>
            <h3 className='text-gray-500'>Localização/Endereço</h3>
            <span className={`flex items-center w-full h-10 outline-2 outline-gray-300 focus:shadow-lg transition duration-100 rounded-xs 
                    ${isCameraAddressFocused === true ? ("outline-2 outline-gray-600") : ("")}`
                }>
                <input className={`w-full pl-4 focus:outline-none`} 
                onFocus={() => setIsCameraAddressFocused(true)} onBlur={() => setIsCameraAddressFocused(false)} 
                type="text" value={cameraAddress} onChange={(e) => setCameraAddress(e.target.value)} placeholder='e.g.R. Tiradentes, 934-990 - Pompéia' />                            
            </span>
          </span> 
          <span className='space-y-2'>
            <h3 className='text-gray-500'>Status</h3>
            <span className='flex w-sm ml-auto mr-auto h-10 p-1 space-x-1 rounded-xl text-xs bg-gray-200'>
                <button onClick={() => setStatusSelected("online")} className={`${buttonClass}
                    ${statusSelected === "online" ? buttonOnClass : buttonOffClass}`}>
                    <h4>Online</h4>
                </button>
                <button onClick={() => setStatusSelected("offline")} className={`${buttonClass} 
                    ${statusSelected === "offline" ? buttonOnSafeClass : buttonOffClass}`}>
                    <h4>Offline</h4>
                </button>
            </span>
          </span> 
          <span className='flex w-full justify-between space-x-5'>
            <span className='flex flex-col w-1/2 space-y-2'>
              <h3 className='text-gray-500'>Posição (da webcam)</h3>
              <span className='relative w-full h-full space-y-1'>
                {cameraPosDropdown && (
                    <div className='absolute bottom-full flex z-30 flex-col w-full h-fit p-3 bg-gray-100 rounded-lg shadow-xl'>
                        <ul className='w-full h-full space-y-0.5'>
                            {CameraPositions.map(position => (
                                <li>
                                    <button onClick={() => setSelectedCameraPos(position)} className='w-full p-2 hover:bg-gray-300 transition rounded-md'>
                                        <span className='flex items-center justify-between'>
                                            <h3 className='text-left text-md font-regular'>{position}</h3>  
                                            <span className={`ml-3 text-md ${position == selectedCameraPos ? "text-gray-500" : "text-white/0"}`}>
                                              <FaCheck/>     
                                            </span>
                                        </span>
                                    </button>
                                </li>                                                    
                            ))}
                        </ul>
                    </div>                                            
                )}    
                <button onClick={() => setCameraPosDropdown(!cameraPosDropdown)} className='w-full h-10'>
                  <div className='flex h-full pl-4 pr-4 items-center rounded-md bg-gray-100 justify-between'>
                    <h3>{selectedCameraPos}</h3>
                    <span><IoIosArrowDown/></span>
                  </div>                            
                </button>                                    
              </span>        
            </span>
            <span className='flex w-1/2 h-full items-end'>
              <button 
              onClick={() => setNewCamera()}
              className='flex w-full h-1/2 p-2 bg-red-500 hover:bg-red-600 transition rounded-lg justify-center items-center'
              >
                <h2 className='text-white font-regular'>
                  Criar Câmera
                </h2>
              </button>
            </span>   
          </span> 
        </div>
      </div>
    </div>
  )
}

export default NewCameraModalComponent
