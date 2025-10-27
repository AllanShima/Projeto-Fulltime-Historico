import React, { useEffect, useState } from 'react'
import SidebarUser from './SidebarUser'
import HomeUser from './HomeUser'
import {userEvents} from '../assets/data/TempData'
import { useUserContext } from '../contexts/user-context'
import { db } from '../services/firebase'
import { FaLocationArrow, FaRegEye } from 'react-icons/fa'
import { firestoreSetAlertSignal } from '../services/api/FirebaseSetFunctions'

// selectedAlert object;
  // {
  //   title: "SUPERVISÃO",
  //   icon: FaSearchLocation,
  // },

// message, help, forms, report, camera, alert
const typeSpecs = {
  "help": ["bg-gray-200 text-gray-800", FaLocationArrow, "Abrir a janela de GPS em tempo real?"],
  "camera": ["bg-green-100 text-green-800", FaRegEye, "Mostrar a Câmera do local?"],
}

const WindowUser = () => {
  const { userState, userDispatch } = useUserContext();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [notificationButtonModal, setNotificationButtonModal] = useState(false);

  const [selectedAlert, setSelectedAlert] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});

  const storeAlert = () => {
    firestoreSetAlertSignal(selectedAlert, userState);
    setShowAlertModal(false);
    window.alert("Alerta Enviado!");
  }

  const storeReport = () => {
    firestoreSetUserReport();
    setNotificationButtonModal(false);
    window.alert("Formulário cadastrado com sucesso! O relatório está sendo preparado...");
  }

  // Acessa a chave 'alert' de forma segura
  const type = selectedEvent?.alert; 
  
  // Calcula as variáveis de estilo e ícone DERIVADAS
  const typeSpec = typeSpecs[type] || []; // Fallback para array vazio ou um padrão
  
  const colorStyle = typeSpec[0] || "bg-gray-500 text-white"; // Fallback de estilo
  const EventIconComponent = typeSpec[1]; // O componente Ícone (que pode ser undefined)
  const typeText = typeSpec[2];

  const hoverStyle1 = "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:cursor-pointer transition duration-200";
  const hoverStyle2 = "bg-linear-to-t from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 hover:cursor-pointer transition duration-200";
  return (
    <>
      {showAlertModal && (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
          <div className='grid content-between w-120 h-50 p-5 bg-white rounded-2xl font-regular'>
            <h2 className='text-center font-bold'>
              Tem certeza que deseja enviar o alerta de
              <span className="text-red-600 underline p-1.5">
                  {selectedAlert.title}
              </span>
              e CHAMAR AS AUTORIDADES? 
            </h2>
            <p className='text-center text-sm text-gray-600'>Não será possível reverter essa ação!</p>
            <div className='flex justify-between px-10 w-full h-10'>
              <button onClick={() => storeAlert} className={`w-40 h-full rounded-lg text-white ${hoverStyle1}`}>
                SIM!
              </button>
              <button onClick={() => setShowAlertModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {notificationButtonModal && (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>

          {selectedEvent.alert === "help" || selectedEvent.alert === "camera" ? (
            <div className='grid content-between w-fit h-fit space-y-5 p-5 bg-white rounded-2xl font-regular'>
              <span className={`flex w-50 h-full rounded-lg justify-center items-center text-xl ${colorStyle}`}>
                <EventIconComponent/>
              </span>
              <h2 className='text-center mt-5 font-bold'>
                {typeText}
              </h2>
              <div className='flex justify-between space-x-5 px-10 w-full h-10'>
                <button onClick={storeAlertSignal} className={`w-40 h-full rounded-lg text-white ${hoverStyle2}`}>
                  Sim
                </button>
                <button onClick={() => setNotificationButtonModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                  Cancelar
                </button>
              </div>              
            </div>
          ) : (
            <div className='grid content-between w-fit h-fit p-5 bg-white rounded-2xl font-regular'>
              <div>
                <h2 className='text-center font-bold'>
                  Formulário de Incidente da Vítima
                </h2>
                <p className='text-center text-sm text-gray-600'>
                  Preencha o formulário com a sua perspectiva do Incidente de plau
                </p>                
              </div>

              <div className='flex justify-between px-10 w-full h-10'>
                <button onClick={storeAlertSignal} className={`w-40 h-full bg-gradient-to-r bg-red-500 to-90% rounded-lg text-white ${hoverStyle2}`}>
                  Enviar
                </button>
                <button onClick={() => setNotificationButtonModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                  Cancelar
                </button>
              </div>              
            </div>
          )}
        </div>
      )}
      <div className='flex flex-1 w-full h-full'>
        <div className='w-1/2 h-full'>
          <SidebarUser userEvents={userEvents} setNotificationButtonModal={setNotificationButtonModal} setSelectedEvent={setSelectedEvent}/>
        </div>
        
        <div className='w-1/2 h-full'>
          <HomeUser setShowModal={setShowAlertModal} setSelectedAlert={setSelectedAlert}/>
        </div>
        
      </div>    
    </>
  )
}

export default WindowUser
