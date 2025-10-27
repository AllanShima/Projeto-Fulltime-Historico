import React, { useEffect, useRef, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import Avatar from "./ui/Avatar";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/user-context';
import { auth } from "../services/firebase";
import SoftwareIcon from './ui/SoftwareIcon';
import { onAuthStateChanged } from 'firebase/auth';
import { FaMapMarkedAlt } from "react-icons/fa";
import ToggleSwitch from './ui/ToggleSwitch';
import SettingsDropdown from './ui/SettingsDropdown';
import UserReport from './UserReport';

const HeaderMonitor = () => {
  const { userState, userDispatch } = useUserContext();
  
  const [ fullname, setFullname ] = useState("Null Null");

  const [ showDropdown, setShowDropdown ] = useState(false);

  const [ modeSwitchState, setModeSwitchState ] = useState(false);
  const [ langSwitchState, setLangSwitchState ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);

  const navigate = useNavigate();

  const MenuOptions = [
    {id: "AD", text: "Configurar Endereço", setState: setShowModal,  state: showModal}, 
    {id: "LG", text: "(EN/PT-BR)", setState: setLangSwitchState,  state: langSwitchState}, 
    {id: "LD", text: "Mudar Ambientação (Light/Dark)", setState: setModeSwitchState,  state: modeSwitchState}
  ];

  const handleLogout = () => {
    // Atualizando o user no data layer
    userDispatch({type: "LOGOUT"})
    // Logout no firebase
    auth.signOut();
    navigate('/login');
  }

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
              console.log("Caminho correto para f/safe, navegando p home.");
              navigate('/user/home');
          } else if (userState.usertype === "f/center") {
              console.log("Usuário monitor, navegando p local correto.");
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

  return (
    <>
      {showModal && (
        <UserReport/>
      )}

      <div className='font-regular grid grid-flow-col px-6 content-center items-center justify-between space-x-0 top-0 w-full h-15 border-b-1 text-gray-300'>
        {/* FullCenter logo */}
        <div className='flex content-center mt-auto mb-auto w-23 space-x-4'>
            <SoftwareIcon title="F/Safe" showTitle={true}/>
        </div>
        <span>
          Demonstração do app F/Safe em Plataforma Web
        </span>
        <div className='grid grid-flow-col justify-end w-full text-primary'>
          <span className='grid grid-flow-col items-center self-end space-x-3'>

            <span className='flex flex-col'>
              <button onClick={() => setShowDropdown(!showDropdown)} className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
                <CiSettings/>
              </button>  
              <SettingsDropdown dropdownState={showDropdown} MenuOptions={MenuOptions}/>
            </span>

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