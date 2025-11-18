import React, { useState } from 'react'
import { BiSolidCameraOff } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { firestoreUpdateCurrentEventStatusByUid, firestoreUpdateCurrentEventVisualizedByUid } from '../services/api/FirebaseUpdateFunctions';

const UserResponseProtocolText = {
  "f/safe": {
    "alert" : [
      "Contate com o Usuário por Chat ou telefone pra confirmar a situação",
      "Determine se é um alerta falso ou não",
      "Confirme a sua localização exata",
      "Chame as autoridades se necessário",
      "Se necessário chame as autoridades",
      "Clique no botão 'Ajuda à Caminho!' para avisar o usuário",
      "Auxilie presencialmente ou procure algum profissional"
    ]
  }
}

const NotificationResponse = ({setModalState, selectedNotification}) => {
  const notificationId = selectedNotification.id;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const sendResponse = () => {
    firestoreUpdateCurrentEventVisualizedByUid(notificationId, true);
    setIsButtonDisabled(true);
  }

  const dismissAlert = () => {
    firestoreUpdateCurrentEventStatusByUid(notificationId, "inactive");
    setModalState(false);
  }

  const responseButtonStyle = !isButtonDisabled ? "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition" : "bg-gray-100 outline-1 text-gray-300"

  return (
    <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
      <div className='grid content-between w-fit h-fit bg-white rounded-2xl font-regular'>
      <span className='flex justify-end px-2 mt-2'>
        <button onClick={() => setModalState(false)}>
          <span className='flex w-fit h-fit p-1 justify-center items-center rounded-full hover:bg-gray-200 transition'>
            <IoClose className='w-5 h-5 text-gray-400'/>              
          </span>
        </button>
      </span>
      {/* Alert Details */}
        <div className='grid w-fit h-fit items-center'>
          <div className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto pb-7 px-7">
            <div className='pb-3'>
              <div className="flex items-center gap-2">
                <FiAlertTriangle className="h-5 w-5 text-destructive text-red-600"/>
                <h1 className='text-primary font-bold'>{selectedNotification?.title || "Alerta"}</h1>
              </div>
              <p className='text-xs text-gray-500 font-regular'>
                Prossiga com os procedimentos de segurança antes de enviar o sinal
              </p>
            </div>
            <hr className='text-gray-500'/>
            <div className="space-y-4 pt-3">
              {/* Recommended Actions */}
              <div className="space-y-2">
                <h4 className="font-semibold text-md text-red-700">Protocolos de Segurança</h4>
                <ul className="space-y-1 text-sm">
                  {UserResponseProtocolText[selectedNotification.software_from][selectedNotification.alert].map((text, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className='flex justify-between w-full h-10 px-8'>
                <button 
                disabled={isButtonDisabled}
                onClick={() => sendResponse()} 
                className={`w-40 h-full rounded-lg text-white cursor-pointer ${responseButtonStyle}`}
                >
                  Ajuda à caminho!
                </button>
                <button onClick={() => dismissAlert()} className='w-40 h-full bg-red-200 rounded-lg outline-1 text-red-500 hover:bg-red-300 hover:cursor-pointer transition'>
                  <p className='text-red-500'>
                    Dispensar Alerta
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationResponse
