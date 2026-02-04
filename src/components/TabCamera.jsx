import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SidebarMonitor from './SidebarMonitor'
import HomeCam from './HomeCam'
// import {cameras as tempCameras} from '../assets/data/TempData'
import { useUserContext } from '../contexts/user-context'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../services/firebase'
import NewCameraModalComponent from './NewCameraModalComponent'
import { events as extraEvents } from '../assets/data/TempData';

const TabCamera = () => {
  const [events, setEvents] = useState([]);

  const [cameras, setCameras] = useState([]);
  const [selectedCam, setSelectedCam] = useState("1");

  const [newCameraModal, setNewCameraModal] = useState(false);

  // Listener do monitor_events
  useEffect(() => {
    const eventsCollectionRef = collection(db, "monitor_events"); 
    const qEvents = query(eventsCollectionRef); // A query para a coleção inteira

    // - INICIA O OUVINTE DE "current_alerts"
    const unsubscribeAlerts = onSnapshot(qEvents, (snapshot) => {
      console.log("Ouvinte de 'monitor_events' em andamento!");
      
      // 3. Mapeia todos os documentos na coleção
      const newEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        // Não é necessário buscar o userId aqui, pois 'current_alerts' é uma coleção de nível superior.
        // Os dados do alerta já devem estar em doc.data()
        ...doc.data()
      }));
       
      // Use a lógica de verificação de dados
      if (newEvents.length >= 1) {
        const combinedEvents = [...newEvents, ...extraEvents];
        setEvents(combinedEvents);
      } else {
        // Opcional: Adicionar lógica se todos os alertas forem removidos
        setEvents([]);
      }
    }, (error) => {
        console.error("Erro no listener de Alertas:", error);
    });

    // 4. CLEANUP CRUCIAL para o listener
    return () => {
      console.log("Listener de monitor_events cancelado.");
      unsubscribeAlerts();
    };
  }, []);

  // Este useEffect cuida da atualização recorrente das cameras criadas pelo monitor
  useEffect(() => {
    // 1. Crie a referência para a Coleção 'monitor_cameras'
    const camerasCollectionRef = collection(db, "monitor_cameras"); 
    const qCameras = query(camerasCollectionRef); // A query para a coleção inteira

    // - INICIA O OUVINTE DE "monitor_cameras"
    const unsubscribeCameras = onSnapshot(qCameras, (snapshot) => {
      // console.log("Ouvinte de monitor_cameras em andamento!");
      
      // 3. Mapeia todos os documentos na coleção
      const newCameras = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
       
      // Use a lógica de verificação de dados
      if (newCameras.length >= 1) {
        setCameras([...newCameras]);
        setSelectedCam(newCameras[0].id);
      }
    }, (error) => {
      console.error("Erro no listener de Alertas:", error);
    });

    // 4. CLEANUP CRUCIAL para o listener
    return () => {
      // console.log("Listener de monitor_cameras cancelado.");
      unsubscribeCameras();
    };
  }, []);

  // Uma nova array que exclui a camera selecionada
  const [remainingCams, setRemainingCams] = useState(cameras.filter(cam => cam.id !== selectedCam))
  
  // Pra ter certeza de que user consegue carregar

  return (
    <>
      {newCameraModal && (
        <NewCameraModalComponent setStateModal={setNewCameraModal}/>
      )}
      <div className='flex flex-1 bg-white'>
        <SidebarMonitor 
        cameras={cameras} 
        events={events} 
        selectedCam={selectedCam} 
        setSelectedCam={setSelectedCam}
        setRemainingCams={setRemainingCams}
        setNewCameraModal={setNewCameraModal}
        />
        <HomeCam cameras={cameras} selectedCam={selectedCam} remainingCams={remainingCams}/>
      </div>    
    </>
  )
}

export default TabCamera
