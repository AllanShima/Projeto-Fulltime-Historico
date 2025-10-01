import React, { useEffect } from 'react'
import { CiSettings } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import Avatar from "./ui/Avatar";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/user-context';
import { auth } from "../firebase";
import SoftwareIcon from './ui/SoftwareIcon';
import { onAuthStateChanged } from 'firebase/auth';

const HeaderMonitor = () => {
  const { userState, userDispatch } = useUserContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Atualizando o user no data layer
    userDispatch({type: "LOGOUT"})
    // Logout no firebase
    auth.signOut();
    navigate('/login');
  }

  useEffect(() => {
    navigate('/user/home')
  }, []);

  useEffect(() => {
    if(auth.currentUser) {
      if(userState.usertype === "f/safe"){
        navigate('/user/home');
      } else if (userState.usertype === "monitor"){
        console.log("Usuário não permitido, navegando p local correto.");
        navigate('/monitor/cameras');
      }
    } else{
      console.log("carregando");
      //navigate('/loading');
    }
  }, [auth.currentUser])

  return (
    <div className='font-regular grid grid-flow-col px-6 content-center items-center justify-between space-x-0 top-0 w-full h-15 border-b-1 text-gray-300'>
      {/* FullCenter logo */}
      <div className='flex content-center mt-auto mb-auto w-23 space-x-4'>
          <SoftwareIcon title="F/Safe" showTitle={true}/>
      </div>
      <span>
        Demonstração do app em Plataforma Web F/Safe
      </span>
      <div className='grid grid-flow-col justify-end w-full text-primary'>
        <span className='grid grid-flow-col items-center self-end space-x-3'>
          <span className='py-2 px-2.5 rounded-lg hover:bg-gray-200 transition duration-300'>
            <CiSettings/>
          </span>
          <span className='flex'>
            <Avatar fullName={userState.fullName} showName={true}/>
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