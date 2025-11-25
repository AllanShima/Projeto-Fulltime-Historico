import React, { useEffect, useState } from 'react'
import SidebarUser from './SidebarUser'
import AlertOptions from './AlertOptions'
import { useUserContext } from '../contexts/user-context'
import { FaLocationArrow, FaRegEye } from 'react-icons/fa'
import { firestoreSetAlertOnByUid } from '../services/api/FirebaseSetFunctions'
import AwaitingResponseModal from './AwaitingResponseModal'
import { firestoreDeleteAlertOnByUid } from '../services/api/FirebaseDeleteFunctions'
import { getDeviceLocation } from '../services/GetGeocode'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import UserSetAddressModal from './UserSetAddressModal'
import { db } from '../services/firebase'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import UserReport from './UserReport'
import PdfViewer from './PdfViewer'
import UserLiveCameraView from './UserLiveCameraView'

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
  // Tela de carregamento
  const [showAwaitModal, setShowAwaitModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showManualAddressModal, setShowManualAddressModal] = useState(false);

  const [notificationButtonModal, setNotificationButtonModal] = useState(false);
  const [pdfButtonModal, setPdfButtonModal] = useState(false);
  const [cameraViewButtonModal, setCameraViewButtonModal] = useState(false);

  const [selectedAlertType, setSelectedAlertType] = useState(null); // Apenas o nome do alerta para inserir no banco
  const [selectedAlert, setSelectedAlert] = useState(null); // Alerta enviado
  const [alertVisualized, setAlertVisualized] = useState(false);

  const [currentEvent, setCurrentEvent] = useState({}); // Evento das notificações

  const geocodingLibrary = useMapsLibrary('geocoding'); // Carrega a biblioteca de geocoding
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState('');

  const SetAlertMode = () => {
    setShowAlertModal(false);
    
    if (!geocodingLibrary) {
      window.alert("Aguarde o carregamento do mapa antes de enviar o alerta.");
      return;
    }
    console.log("1. SetAlertMode iniciado. Chamando getDeviceLocation...");

    // Define a função de tratamento de falha de precisão
    const handleFailure = () => {
      setShowAwaitModal(false); // Fecha o modal de espera
      setShowManualAddressModal(true);
    };

    // Define a função de callback
    const handleLocationFound = (newAddress, newCoords) => {
      
      // 1. Atualiza os estados (address e coords) para a próxima renderização
      setAddress(newAddress);
      setCoords(newCoords);

      setShowAwaitModal(true); // Exibe o modal de espera imediatamente

      // 2. ✅ Chama o Firebase SOMENTE QUANDO O ENDEREÇO ESTIVER PRONTO
      // Usamos o newAddress, pois o estado 'address' ainda não foi atualizado
      firestoreSetAlertOnByUid(selectedAlertType, userState, userDispatch, newAddress);
      
      // window.alert(`Alerta enviado com endereço: ${newAddress}`); // Verifique o valor
    };

    // Chamamos a função, passando o callback
    getDeviceLocation({
      geocodingLibrary: geocodingLibrary, // A variável que contém a biblioteca (do hook)
      callback: handleLocationFound,
      onFailure: handleFailure
    });
    setSelectedAlert(userState.alertOn);
  }

  const ResetAlertMode = async() => {
    await userDispatch({ type: "RESET_ALERT"});
    window.alert("Alerta dispensado pelo monitor...");
    setShowAwaitModal(false);
    setSelectedAlert(null);
  }

  const AlertWasVisualized = async() => {
    window.alert("Alerta visualizado! Ajuda está a caminho...");
    await setAlertVisualized(true);
    console.log("O campo 'visualized' mudou para true! O alerta foi visualizado.");
  }

  // Acessa a chave 'alert' de forma segura
  const type = currentEvent?.alert; 
  
  // Calcula as variáveis de estilo e ícone DERIVADAS
  const typeSpec = typeSpecs[type] || []; // Fallback para array vazio ou um padrão
  
  const colorStyle = typeSpec[0] || "bg-gray-500 text-white"; // Fallback de estilo
  const EventIconComponent = typeSpec[1]; // O componente Ícone (que pode ser undefined)
  const typeText = typeSpec[2];

  useEffect(() => {
      // 1. REIDRATAÇÃO DO ESTADO LOCAL E CONDIÇÃO DE GUARDA PRINCIPAL
      // Esta lógica garante que o listener só será criado/mantido se houver um alerta ativo.
      // Setando o alerta mesmo depois de reiniciar a pagina
      if (userState.uid && userState.alertOn != null) {
          // A. Reidratação do estado local:
          
          setSelectedAlert(userState.alertOn);
          setShowAwaitModal(true);

          // B. Configuração do Listener do Firestore
          const alertUid = userState.uid;
          const alertDocRef = doc(db, "current_alerts", alertUid); 

          const unsubscribeAlert = onSnapshot(alertDocRef, (docSnapshot) => {
              console.log(`Ouvinte para o Alerta ${alertUid} em andamento!`);
              
              if (docSnapshot.exists()) {
                const alertData = docSnapshot.data();

                if (alertData.visualized === true) {
                  AlertWasVisualized();
                } 

                if (alertData.status === "inactive") {
                  ResetAlertMode();
                }
              } else {
                console.log("Alerta não encontrado ou foi excluído.");
                // Se o documento for excluído no Firestore, você também deve redefinir:
                ResetAlertMode(); 
              }
          }, (error) => {
              console.error("Erro no listener de Alerta específico:", error);
          });

          // 2. CLEANUP: Roda quando o componente desmonta OU quando userState.alertOn MUDAR.
          return () => {
              console.log(`Listener para o Alerta ${alertUid} cancelado.`);
              unsubscribeAlert();
          };
      }

      // 3. CLEANUP SECUNDÁRIO: Se userState.alertOn for null, garante que o alerta seja resetado localmente
      // Este retorno ocorre se a condição 'if' acima não for satisfeita.
      else if (selectedAlert != null) {
          // Garantir que o estado local seja limpo se o estado global não tiver alerta
          setSelectedAlert(null);
          setShowAwaitModal(false);
      }

      // 4. Dependência: O useEffect re-roda sempre que o estado do alerta global muda.
  }, [userState.alertOn, userState.uid, setSelectedAlert, setShowAwaitModal, AlertWasVisualized, ResetAlertMode, db]);

  const hoverStyle1 = "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:cursor-pointer transition duration-200";
  const hoverStyle2 = "bg-linear-to-t from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 hover:cursor-pointer transition duration-200";
  return (
    <>
      {userState.alertOn && selectedAlert != null && showAwaitModal && (
        <AwaitingResponseModal selectedAlert={userState.alertOn} alertVisualized={alertVisualized}/>
      )}

      {showManualAddressModal && (
        <UserSetAddressModal 
        setAddress={setAddress} 
        address={address} 
        setShowAwaitModal={setShowAwaitModal} 
        selectedAlertType={selectedAlertType}
        setThisModal={setShowManualAddressModal}
        />
      )}

      {showAlertModal && (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
          <div className='grid content-between w-120 h-50 p-5 bg-white rounded-2xl font-regular'>
            <h2 className='text-center font-bold'>
              Tem certeza que deseja enviar o alerta de
              <span className="text-red-600 underline p-1.5">
                {selectedAlertType}
              </span>
              e CHAMAR AS AUTORIDADES? 
            </h2>
            <p className='text-center text-sm text-gray-600'>Não será possível reverter essa ação!</p>
            <div className='flex justify-between px-10 w-full h-10'>
              <button onClick={SetAlertMode} className={`w-40 h-full rounded-lg text-white ${hoverStyle1}`}>
                SIM!
              </button>
              <button onClick={() => setShowAlertModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {notificationButtonModal && currentEvent.alert === "forms" && (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
          <UserReport currentNotification={currentEvent} setNotificationButtonModal={setNotificationButtonModal}/>              
        </div>
      )}

      {cameraViewButtonModal && currentEvent.alert == "camera" && (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
          <UserLiveCameraView currentNotification={currentEvent} setCameraViewButtonModal={setCameraViewButtonModal}/>
        </div>
      )}

      {pdfButtonModal && currentEvent.alert == "report" && (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
          <PdfViewer setShowModal={setPdfButtonModal} selectedEvent={currentEvent} sent_to_user={false}/>                        
        </div>
      )}

      <div className='flex flex-1 w-full h-full'>
        <div className='w-1/2 h-full'>
          <SidebarUser 
          setNotificationButtonModal={setNotificationButtonModal} 
          setPdfButtonModal={setPdfButtonModal} 
          setCameraViewButtonModal={setCameraViewButtonModal} 
          setCurrentEvent={setCurrentEvent}
          />
        </div>
        
        <div className='w-1/2 h-full'>
          <AlertOptions setSelectedAlertType={setSelectedAlertType} setShowModal={setShowAlertModal} isLoading={showAwaitModal}/>
        </div>
        
      </div>    
    </>
  )
}

export default WindowUser
