import React, { useEffect, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import Avatar from "./ui/Avatar";
import { CiViewTimeline } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/user-context';
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';

const HeaderMonitor = () => {
  const { userState, userDispatch } = useUserContext();

  const [ fullname, setFullname ] = useState("Null Null");

  const tabClass = "flex space-x-2 w-full py-1 cursor-default justify-center content-center items-center rounded-lg";
  const tabOnClass = "bg-primary text-white transition duration-200";
  const tabOffClass = "bg-gray-200 text-primary transition duration-200";

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Atualizando o user no data layer
    // userDispatch({type: "LOGOUT"})
    // Logout no firebase
    auth.signOut();
    // dispatch é feito no app.jsx
    navigate('/login');
  }

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

  return (
    <div className='font-regular grid grid-flow-col px-6 content-center items-center justify-between space-x-0 top-0 w-full h-15 border-b-1 text-gray-300'>
      {/* FullCenter logo */}
      <div className='flex content-center mt-auto mb-auto w-40 space-x-2'>
          <img src="/icon.png" alt="Fulltime logo" className='w-8 rounded-sm'/>
          <h1 className='mt-auto mb-auto font-regular text-primary'>
            FullCenter
          </h1>
      </div>
      <span className='flex w-130 h-fit p-1 space-x-1 rounded-xl text-sm bg-gray-200'>
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
          <h4>Live Chat + GPS</h4>
        </Link>
      </span>
      <div className='grid grid-flow-col justify-end w-full text-primary'>
        <span className='grid grid-flow-col items-center self-end space-x-3'>
          <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
            <CiSettings/>
          </span>
          <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
            <RiNotification3Line/>
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
  )
}

export default HeaderMonitor