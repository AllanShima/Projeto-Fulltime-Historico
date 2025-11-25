import React, { useEffect, useState } from 'react'
import { BiSolidCameraOff } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { firestoreUpdateCurrentEventStatusByUid, firestoreUpdateCurrentEventVisualizedByUid, firestoreUpdateUserCanRecord, firestoreUpdateUserNotificationShowButtonFalse } from '../services/api/FirebaseUpdateFunctions';
import { useUserContext } from '../contexts/user-context';
import { firestoreDeleteAlertOnByUid } from '../services/api/FirebaseDeleteFunctions';
import { firestoreSetMonitorEvent, firestoreSetUserNotification } from '../services/api/FirebaseSetFunctions';
import { sendAlertEmail } from '../assets/functions/SendEmail';
import { db } from '../services/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestoreGetAlertOnByUid } from '../services/api/FirebaseGetFunctions';

const UserResponseProtocolText = {
  "f/safe": {
    // Se for um alerta emergencial
    "alert" : [
      "Contate com o Usuário por Chat ou telefone pra confirmar a situação",
      "Determine se é um alerta falso ou não",
      "Confirme a sua localização exata",
      "Chame as autoridades se necessário",
      "Clique no botão 'Ajuda à Caminho!' para avisar o usuário",
      "Opcionalmente: Descubra a câmera mais perto do incidente, e clique em gravar",
      "Auxilie presencialmente ou procure algum profissional"
    ],
    "help": [
      "Contate com o Usuário por Chat ou telefone pra confirmar a situação",
      "Determine se é um alerta falso ou não",
      "Confirme a sua localização exata",
      "Clique no botão 'Ajuda à Caminho!' para avisar o usuário",
      "Opcionalmente: Descubra a câmera mais perto do incidente, e clique em GRAVAR",
      "Auxilie presencialmente ou procure algum profissional"
    ]
  }
}

const NotificationResponse = ({setModalState, selectedNotification}) => {

  const { userState, userDispatch } = useUserContext();

  const notificationId = selectedNotification.id;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [changeButton, setChangeButton] = useState(false);

  const protocols = UserResponseProtocolText?.[selectedNotification?.software_from]?.[selectedNotification?.alert];

  const sendResponse = async() => {
    setIsButtonDisabled(true);
    await firestoreUpdateUserCanRecord(userState.uid, userDispatch, true);
    await firestoreUpdateCurrentEventVisualizedByUid(notificationId, true);

    await firestoreSetUserNotification(notificationId, "help_incoming");

    setIsButtonDisabled(false);
    setChangeButton(true)
  }

  const endAlert = async() => {
    setIsButtonDisabled(true);

    const emailContent = {
      toEmail: userState.email,
      subject: `Alerta Finalizado: ${selectedNotification.device} - FullCenter`,
      text: `O evento ${selectedNotification.device} foi gerado automaticamente pelo sistema e já pode ser baixado na plataforma.`,
      html: `<p>O evento ${selectedNotification.device} foi gerado automaticamente pelo sistema e já pode ser baixado na plataforma.</p>`,
    };

    try {
      // 1. Envia o e-mail através do seu endpoint de API seguro
      // await sendAlertEmail(emailContent);

      // 2. Continua com as operações de Firestore
      await firestoreUpdateUserCanRecord(userState.uid, userDispatch, false);

      // Fazer esperar 10 segundos aqui ANTES DE EXECUTAR AS FUNÇÕES
      console.log("Aguardando 10 segundos antes de finalizar o alerta...");
      // ************ IMPLEMENTAÇÃO DO ATRASO ************
      await new Promise(resolve => setTimeout(resolve, 10000));
      console.log("10 segundos se passaram. Executando finalização.");

      await firestoreUpdateCurrentEventStatusByUid(notificationId, "inactive");

      const newCurrentAlert = await firestoreGetAlertOnByUid(notificationId);

      await firestoreSetMonitorEvent(newCurrentAlert); 
      await firestoreDeleteAlertOnByUid(notificationId);
      await firestoreSetUserNotification(notificationId, "incident_form", null, selectedNotification.monitor_id);

      // Setando show_button para false de todas as notificações do usuário de visualização de camera
      // 1. Crie a referência DIRETA à coleção "current_alerts" (Nível Superior)
      const userNotificationsCollection = collection(db, "users", notificationId, "notifications");
      const q = query(userNotificationsCollection);

      // 2. Busque o snapshot de todos os documentos na coleção
      const snapshot = await getDocs(q);

      // 3. Mapeie todos os documentos, extraindo o ID e os dados
      const allUserNotifications = snapshot.docs.map(doc => ({
          // O ID do documento (que pode ser o UID do usuário)
          id: doc.id, 
          // Os dados do alerta
          ...doc.data()
      }));

      for (let i = 0; i < allUserNotifications.length; i++){
        if (allUserNotifications[i].alert == "camera") {
          await firestoreUpdateUserNotificationShowButtonFalse(notificationId, allUserNotifications[i].id);
        }
      }
        
      setModalState(false);

      } catch (error) {
          console.error("Falha na operação completa de 'endAlert', e-mail pode ter falhado.", error);
          // Implemente uma UI para notificar o usuário sobre a falha do e-mail.
      } finally {
          setIsButtonDisabled(false);
      }
  }

  const dismissAlert = async() => {
    await firestoreUpdateCurrentEventStatusByUid(notificationId, "inactive");
    await firestoreDeleteAlertOnByUid(notificationId) // Deletando o alerta
    setIsButtonDisabled(true);
    setModalState(false);
  }

  // Atualizar o botão quando renderizar
  useEffect(() => {
    if (selectedNotification.visualized === true){
      setChangeButton(true);
    }
    if (selectedNotification.status === "inactive"){
      setIsButtonDisabled(true);
    }
  }, [])

  const responseButtonStyle = !isButtonDisabled ? "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 cursor-pointer transition" : "bg-gray-100 outline-1 text-gray-300"

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
                  {protocols?.map((text, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="flex h-full text-destructive">•</div>
                      <div className='flex h-full'>{text}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className='flex justify-between w-full h-10 px-8'>
                {!changeButton ? (
                  <button 
                  disabled={isButtonDisabled}
                  onClick={() => sendResponse()} 
                  className={`w-40 h-full rounded-lg text-white ${responseButtonStyle}`}>
                    Ajuda à caminho!
                  </button>                  
                ) : (
                  <button 
                  disabled={isButtonDisabled}
                  onClick={() => endAlert()} 
                  className={`w-40 h-full rounded-lg text-white ${responseButtonStyle}`}>
                    Terminar alerta
                  </button>      
                )}

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
