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

  const [selectedAlertType, setSelectedAlertType] = useState(null); // Apenas o nome do alerta para inserir no banco
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [currentEvent, setCurrentEvent] = useState({});

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

  const ResetAlertMode = () => {
    firestoreDeleteAlertOnByUid(userState, userDispatch);
    firestoreSetMonitorEvent(selectedAlert)
    setShowAwaitModal(false);
  }

  const storeReport = () => {
    firestoreSetUserReport();
    setNotificationButtonModal(false);
    window.alert("Formulário cadastrado com sucesso! O relatório está sendo preparado...");
  }

  // Setando o alerta mesmo depois de reiniciar a pagina
  useEffect(() => {
    if (userState.uid && userState.alertOn != null) {
      // A lógica de reidratação do alerta só roda APÓS o login ser confirmado
      setSelectedAlert(userState.alertOn);
      setShowAwaitModal(true);
    }
  }, [userState.alertOn]); // <-- CHAVE AQUI: Roda SOMENTE quando o alertOn for definido (usuário logado e alerta ligado)

  // Acessa a chave 'alert' de forma segura
  const type = currentEvent?.alert; 
  
  // Calcula as variáveis de estilo e ícone DERIVADAS
  const typeSpec = typeSpecs[type] || []; // Fallback para array vazio ou um padrão
  
  const colorStyle = typeSpec[0] || "bg-gray-500 text-white"; // Fallback de estilo
  const EventIconComponent = typeSpec[1]; // O componente Ícone (que pode ser undefined)
  const typeText = typeSpec[2];

  const hoverStyle1 = "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:cursor-pointer transition duration-200";
  const hoverStyle2 = "bg-linear-to-t from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 hover:cursor-pointer transition duration-200";
  return (
    <>
      {userState.alertOn && selectedAlert != null && (
        <AwaitingResponseModal selectedAlert={userState.alertOn}/>
      )}

      {showManualAddressModal && (
        <UserSetAddressModal setAddress={setAddress} address={address} setShowAwaitModal={setShowAwaitModal}/>
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
      {notificationButtonModal && (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>

          {currentEvent.alert === "help" || currentEvent.alert === "camera" ? (
            <div className='grid content-between w-fit h-fit space-y-5 p-5 bg-white rounded-2xl font-regular'>
              <span className={`flex w-50 h-full rounded-lg justify-center items-center text-xl ${colorStyle}`}>
                <EventIconComponent/>
              </span>
              <h2 className='text-center mt-5 font-bold'>
                {typeText}
              </h2>
              <div className='flex justify-between space-x-5 px-10 w-full h-10'>
                <button className={`w-40 h-full rounded-lg text-white ${hoverStyle2}`}>
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
                <button onClick={storeReport} className={`w-40 h-full bg-gradient-to-r bg-red-500 to-90% rounded-lg text-white ${hoverStyle2}`}>
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
          <SidebarUser setNotificationButtonModal={setNotificationButtonModal} setCurrentEvent={setCurrentEvent}/>
        </div>
        
        <div className='w-1/2 h-full'>
          <AlertOptions setSelectedAlertType={setSelectedAlertType} setShowModal={setShowAlertModal} isLoading={showAwaitModal}/>
        </div>
        
      </div>    
    </>
  )
}

export default WindowUser
