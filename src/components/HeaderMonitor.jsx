import React, { useEffect, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import Avatar from "./ui/Avatar";
import { CiViewTimeline } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/user-context';
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import ToggleSwitch from './ui/ToggleSwitch';
import { firestoreGetNotifications } from '../services/api/FirebaseGetFunctions';
import SettingsDropdown from './ui/SettingsDropdown';
import NotificationsDropdown from './ui/NotificationsDropdown';
import AddressModalComponent from './AddressModalComponent';
import { collection, collectionGroup, onSnapshot, query } from 'firebase/firestore';
import NewNotification from './ui/NewNotification';
import NotificationResponse from './NotificationResponse';
import NotificationDetails from './NotificationDetails';

const HeaderMonitor = () => {
  const { userState, userDispatch } = useUserContext();

  const [ fullname, setFullname ] = useState("Null Null");

  const tabClass = "flex space-x-2 w-full py-1 cursor-default justify-center content-center items-center rounded-lg";
  const tabOnClass = "bg-primary text-white transition duration-200";
  const tabOffClass = "bg-gray-200 text-primary transition duration-200";

  const location = useLocation();
  const navigate = useNavigate();

  const [modeSwitchState, setModeSwitchState] = useState(false);
  const [langSwitchState, setLangSwitchState] = useState(false);
  const [emailSwitchState, setEmailSwitchState] = useState(false);
  const [showPfpDropdown, setShowPfpDropdown] = useState(false);
  const [showVideoSettingsDropdown, setShowVideoSettingsDropdown] = useState(false);

  const [videoAmountInSeconds, setVideoAmountInSeconds] = useState('');
  const [pfpUrlText, setPfpUrlText] = useState('');

  const [isVideoInputFocused, setIsVideoInputFocused] = useState(false);
  const [isPfpInputFocused, setIsPfpInputFocused] = useState(false);

  const ConfigureVideoAmount = () => {
    window.alert("Configurando...");
    setVideoAmountInSeconds('');
  }

  const ConfigureNewPfp = () => {
    window.alert("Atualizando...");
    setPfpUrlText('');
  }
      
  const MenuOptions = [
    {
      id: "LG", 
      text: "(EN/PT-BR)", 
      setState: setLangSwitchState,  
      state: langSwitchState
    }, 
    {
      id: "LD", 
      text: "Mudar ambientação (Light/Dark)", 
      setState: setModeSwitchState,  
      state: modeSwitchState
    },
    {
      id: "EMAIL", 
      text: "Enviar Notificação por Email", 
      setState: setEmailSwitchState,  
      state: emailSwitchState
    },
    {
      id: "PFP", 
      text: "Mudar imagem de perfil", 
      setState: setShowPfpDropdown,  
      state: showPfpDropdown, 
      input: pfpUrlText,
      setInput: setPfpUrlText, 
      isFocused: isPfpInputFocused, 
      setIsFocused: setIsPfpInputFocused,
      placeholder: "url/da/imagem",
      function: ConfigureNewPfp
    }
  ];


  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleLogout = () => {
    // Atualizando o user no data layer
    // userDispatch({type: "LOGOUT"})
    // Logout no firebase
    auth.signOut();
    // dispatch é feito no app.jsx
    navigate('/login');
  }

  const [showSettingsDropdown, setSettingsShowDropdown] = useState(false);
  const [notificationShowDropdown, setNotificationShowDropdown]  = useState(false);

  // Função que você vai usar no botão de notificação
  const toggleNotificationDropdown = () => {
    setNotificationShowDropdown(!notificationShowDropdown);
    setSettingsShowDropdown(false); 
  };

  // Função que você usaria no botão do outro dropdown
  const toggleSettingsDropdown = () => {
    setSettingsShowDropdown(!showSettingsDropdown);
    setNotificationShowDropdown(false); 
  };

  useEffect(() => {
    navigate('/monitor/cameras')
  }, []);

  // Este useEffect cuida APENAS da autenticação e define o usuário do Firebase
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          // Assume que você tem uma função para armazenar o UID no seu estado/contexto
          // Se user for null, o estado de autenticação da aplicação deve ser limpo.
          if (user) {
              console.log("Usuário Firebase logado. Buscando dados do Firestore...");
              // Você deve chamar uma função aqui para buscar os dados do Firestore (userState)
              // ex: fetchFirestoreUser(user.uid);
          } else {
              console.log("Nenhum usuário logado. Limpando estados.");
              // Redireciona para a página de login se não houver usuário
              navigate('/login'); 
          }
      });
      return () => unsubscribe();
  }, [auth, navigate]); // Depende apenas de 'auth' e 'navigate'

  // ------------------------------------------------------------------

  // Este useEffect cuida do redirecionamento após o userState ser carregado
  useEffect(() => {
      if (userState && userState.usertype) {
        if (userState.usertype === "f/safe") {
            console.log("Usuário f/safe, navegando p local correto.");
            navigate('/user/home');
        } else if (userState.usertype === "f/center") {
            console.log("Caminho correto para f/center, mantendo a janela.");
            navigate('/monitor/cameras');
        }
        
        // Setando o nome completo para o icone Avatar
        setFullname(userState.first + " " + userState.last);

      } else if (auth.currentUser) {
        // Se o Firebase diz que está logado (auth.currentUser existe),
        // mas o userState ainda não foi carregado, não faz nada (espera).
        console.log("Aguardando dados do Firestore...");
      }
  }, [userState, navigate, auth]); // AGORA depende de userState

  // ------------------------------------------------------------------

  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [events, setEvents] = useState([]);

  // Este useEffect cuida da atualização recorrente das notificações e eventos recebidos pelo usuário f/safe
  useEffect(() => {
    // 1. Crie a referência para a Coleção 'current_alerts'
    const alertsCollectionRef = collection(db, "current_alerts"); 
    const qAlerts = query(alertsCollectionRef); // A query para a coleção inteira

    // - INICIA O OUVINTE DE "current_alerts"
    const unsubscribeAlerts = onSnapshot(qAlerts, (snapshot) => {
      console.log("Ouvinte de Current_Alerts em andamento!");
      
      // 3. Mapeia todos os documentos na coleção
      const newAlerts = snapshot.docs.map(doc => ({
        id: doc.id,
        // Não é necessário buscar o userId aqui, pois 'current_alerts' é uma coleção de nível superior.
        // Os dados do alerta já devem estar em doc.data()
        ...doc.data()
      })).filter(event => event.status == "active");
       
      // Use a lógica de verificação de dados
      if (newAlerts.length >= 1) {
        setNotifications(newAlerts);
        // Substitua as linhas comentadas pelas suas funções de estado (setNotifications, setShowUserAlertModal)
      } else {
        // Opcional: Adicionar lógica se todos os alertas forem removidos
        setNotifications([]);
      }
    }, (error) => {
      console.error("Erro no listener de Alertas:", error);
    });

    // 4. CLEANUP CRUCIAL para o listener
    return () => {
      console.log("Listener de current_Alerts cancelado.");
      unsubscribeAlerts();
    };
  }, []);

  return (
    <>
      {/* Modal de resposta da notificação */}
      {showResponseModal && (
        <NotificationResponse setModalState={setShowResponseModal} selectedNotification={selectedNotification}/>
      )}

      {/* Modal de detalhes da notificação */}
      {showDetailsModal && (
        <NotificationDetails setModalState={setShowDetailsModal} selectedNotification={selectedNotification}/>
      )}

      <div className='font-regular grid grid-flow-col px-6 content-center items-center justify-between space-x-0 top-0 w-full h-18 border-b-1 text-gray-300'>
        {/* FullCenter logo */}
        <div className='flex content-center mt-auto mb-auto w-fit space-x-2'>
            <img src="/icon.png" alt="Fulltime logo" className='w-8 rounded-sm'/>
            <h1 className='mt-auto mb-auto font-regular text-primary'>
              FullCenter
            </h1>
        </div>
        <div className='flex mt-auto mb-auto w-fit'>
            <h1 className='mt-auto mb-auto font-light text-gray-300'>
              (Protótipo)
            </h1>
        </div>
        <span className='flex w-180 h-fit p-1 space-x-1 rounded-xl text-sm bg-gray-200'>
          <Link to={"cameras"} className={`${tabClass}
            ${location.pathname === "/monitor/cameras" ? tabOnClass : tabOffClass}`}>
            <BsCameraVideo className='w-4'/>
            <h4>Câmeras</h4>
          </Link>
          <Link to={"history"} className={`${tabClass} 
            ${location.pathname === "/monitor/history" ? tabOnClass : tabOffClass}`}>
            <CiViewTimeline className='w-4'/>
            <h4>Histórico de Eventos</h4>
          </Link>
          <Link to={"chat"} className={`${tabClass} 
            ${location.pathname === "/monitor/chat" ? tabOnClass : tabOffClass}`}>
            <CiViewTimeline className='w-4'/>
            <h4>Live Chat + Maps</h4>
          </Link>
        </span>
        <div className='grid grid-flow-col justify-end w-full text-primary'>
          <span className='grid grid-flow-col items-center self-end space-x-3'>
              <span className='flex flex-col'>
                <button onClick={toggleSettingsDropdown} className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
                  <CiSettings/>
                </button>  
                {showSettingsDropdown && (
                  <SettingsDropdown MenuOptions={MenuOptions}/>
                )}
              </span>
            {/* Notificações */}
            <div className='flex flex-col'>
              <button onClick={toggleNotificationDropdown} className='flex py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
                <RiNotification3Line/>
                {notifications.filter(notification => notification.visualized == false).length >= 1 && (
                  <span className='absolute top-5 ml-2'>
                    <NewNotification notifications={notifications}/>
                  </span>                  
                )}
              </button>
              <span className='flex'>
                {notificationShowDropdown && (
                  <NotificationsDropdown 
                  notifications={notifications}
                  setSelectedNotification={setSelectedNotification}
                  setShowResponseModal={setShowResponseModal}
                  setShowDetailsModal={setShowDetailsModal}
                  />
                )}                
              </span>

            </div>
            <span className='flex'>
              <Avatar fullName={fullname} showName={true}/>
            </span>
            <a onClick={handleLogout} className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300 cursor-default'>
              <RxExit/>
            </a>
          </span>
        </div>
      </div>    
    </>
  )
}
export default HeaderMonitor