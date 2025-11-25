import React, { useEffect, useState } from 'react'
import { BiSolidCameraOff } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { MdKeyboardArrowUp } from "react-icons/md";
import RecordingIndicator from './ui/RecordingIndicator';
import SeverityIndicator from './ui/SeverityIndicator';
import SoftwareIcon from './ui/SoftwareIcon';
import getTimePassed from '../assets/functions/GetTimePassed';

import {cameras} from '../assets/data/TempData'
import { firestoreSetUserNotification } from '../services/api/FirebaseSetFunctions';
import { firestoreUpdateCurrentEventCameraByUid } from '../services/api/FirebaseUpdateFunctions';

const NotificationsDetails = {
    "f/safe": {
        "INCÊNDIO": "Incêndio",
        "ALAGAMENTO": "Alagamento",
        "FURTO/ROUBO RESIDENCIAL": "Furto/Roubo Residencial",
        "EMERGÊNCIA MÉDICA": "Emergência Médica",
        "FALHA NA ILUMINAÇÃO": "Falha na Iluminação",
        "PÂNICO": "Pânico",
        "CHUVAS SEVERAS": "Chuvas Severas",
        "VIOLÊNCIA DOMÉSTICA": "Violência Doméstica",
        "SUPERVISÃO": "Supervisão"
    },
    "f/cam": {

    }
}

const severityOpt = {
    "critical": ["Crítico", "text-red-700"],
    "high": ["Alto", "text-"],
    "medium": ["Médio"],
    "low": ["Baixo"]
}

const AlertProtocols = [
    "Verificar a origem do alerta (localização, usuário...)",
    "Observar localização com o ponto de vista da Câmera",
    "Enviar acesso à Câmera se necessário",
    "Gravar as câmeras se necessário",
    "Responder à chamada"
]

// Dados Mock de Câmeras para o Dropdown
// const MOCK_CAMERAS = [
//     { id: 'cam1', name: 'Câmera Principal (Entrada)' },
//     { id: 'cam2', name: 'Câmera Secundária (Corredor)' },
//     { id: 'cam3', name: 'Câmera Traseira (Estacionamento)' },
// ];

const NotificationDetails = ({setModalState, selectedNotification}) => {

    const notification = selectedNotification;

    const [showCamerasDropdown, setShowCamerasDropdown] = useState(false);
    const [cameraOption, setCameraOption] = useState(cameras[0]);

    const [offImmediatly, setOffImmediatly] = useState(false);

    const [timePassed, setTimePassed] = useState('');

    useEffect(() => {
        // Essa função vai ser executada a cada segundo
        const updateTime = () => {
        // Assuming event.date is a valid Date object or can be parsed
        const eventDate = new Date(notification.date);
        const timeString = getTimePassed(eventDate);
        if (timeString == "agora"){
            setTimePassed(`quase ${timeString}`);
        } else{
            setTimePassed(`${timeString} atrás`);
        }
        };

        // Call updateTime immediately when the component mounts
        updateTime();

        // Set up an interval to update the time every 10 seconds for better performance
        const intervalId = setInterval(updateTime, 10000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [notification.date]);


    const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition"
    const status = notification.status == "active" ? "Ativo" : "Inativo";
    const severity = severityOpt[notification.severity][0];

    const sendCameraAccess = async() => {
        await firestoreSetUserNotification(notification.uid, "live_camera", null, notification.monitor_id, cameraOption);
        await firestoreUpdateCurrentEventCameraByUid(notification.uid, cameraOption);
        setOffImmediatly(true)
        window.alert("Acesso à camera dada ao usuário...");
    }

    return (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
            <div className='grid content-between w-fit h-fit bg-white rounded-2xl font-regular'>
            {/* Alert Details */}
                <div className='grid w-fit h-155 items-center'>
                    <div className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto px-7 py-3">
                        <span className='flex justify-between'>
                            <div>
                                <div className="flex items-center gap-2">
                                    <FiAlertTriangle className="h-5 w-5 text-red-700" />
                                    <h1>Detalhes do {notification?.title || "Alerta"}</h1>
                                </div>
                                <h2 className='text-sm text-gray-600'>
                                    {notification?.description}
                                </h2>
                            </div>   
                            <span>
                                <SoftwareIcon title={notification.software_from}/> 
                            </span> 
                        </span>
                        
                        <div className="space-y-4 pt-4">
                        {/* Alert Status */}
                            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20 text-red-700 bg-red-100 mb-4">
                                <span className='flex items-center'>
                                    <span>
                                        <RecordingIndicator/>
                                    </span>
                                    
                                    <div className='flex flex-col ml-3'>
                                        <p className="font-semibold text-destructive">Alerta Iminente do F/Safe</p>
                                        <p className="text-xs text-muted-foreground text-primary ">Status: {status}</p>
                                    </div>
                                </span>
                                <span className='flex px-2 py-1 rounded-lg bg-red-600 text-xs font-bold text-white'>
                                    Alerta
                                </span>
                            </div>
                        </div>

                        {/* Location & Time Information */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                    <FiMapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Localização</span>
                                </div>
                                <p className="pl-6 text-sm">{notification.location}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaRegClock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Horário do Alerta</span>
                                    </div>
                                    {/* // Converta o Timestamp para Date antes de chamar toLocaleString() */}
                                <p className="pl-6 text-sm">{notification.date.toDate().toLocaleString()}</p> 
                            </div>
                        </div>

                        {/* Diagnostics Data */}
                        <div className="space-y-2 mb-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <FiActivity className="h-4 w-4" />
                                Diagnóstico do Sistema
                            </h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <p className="text-muted-foreground">Severidade do Alerta</p>
                                    <SeverityIndicator severity={notification.severity} layout2={false}/>
                                </div>
                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <p className="text-muted-foreground">Acesso à Câmera</p>
                                    <p className="text-destructive font-semibold">{notification.camera != null ? "Enviado" : "Não"}</p>
                                </div>
                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <p className="text-muted-foreground">Enviado há</p>
                                    <p className="font-semibold">{timePassed}</p>
                                </div>
                            </div>
                        </div>

                        {/* Error Assessment */}
                        <div className="space-y-2 mb-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <FiAlertTriangle className="h-4 w-4" />
                                Análise do Alerta
                            </h4>
                            <div className="p-3 bg-gray-100 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tipo de Alerta:</span>
                                    <span className="text-destructive font-semibold">{notification.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Causa Provável:</span>
                                    <span>Um usuário requer ajuda!</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Actions */}
                        <div className="space-y-2 mb-4">
                            <h4 className="font-semibold">Ações Recomendadas</h4>
                            <ul className="space-y-1 text-sm">
                                {AlertProtocols.map((text, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-red-600 mt-1">•</span>
                                        <span>{text}</span>
                                    </li>                                    
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex justify-between px-10 w-full h-10'>
                            {notification.camera == null && !offImmediatly && (
                                <span className='flex space-x-2'>
                                    <span className='relative flex flex-col w-full h-full space-x-2'>
                                        {/* Dropdown Container (Controlado por showCamerasDropdown) */}
                                        {showCamerasDropdown && (
                                            // Adicionado 'bottom-full mt-1' para posicionar abaixo do botão
                                            <div className='absolute bottom-full mb-1 flex flex-col w-full min-w-[120px] max-h-40 overflow-y-auto bg-white border border-gray-300 shadow-lg rounded-lg z-20'>
                                                {cameras.map((camera) => (
                                                    <button
                                                        key={camera.id}
                                                        // 1. Atualiza a opção selecionada
                                                        onClick={() => {
                                                            setCameraOption(camera);
                                                            // 2. Fecha o dropdown após a seleção
                                                            setShowCamerasDropdown(false);
                                                        }}
                                                        className={`py-2 px-4 text-left hover:bg-red-100 transition duration-150 text-xs ${
                                                            camera.name === cameraOption.name
                                                                ? 'bg-red-50 font-bold text-red-600' 
                                                                : 'text-gray-700'
                                                        }`}
                                                    >
                                                        {camera.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {/* Fim do Dropdown Container */}
                                        <button 
                                            onClick={() => setShowCamerasDropdown(!showCamerasDropdown)}
                                            className='flex items-center w-fit h-full px-4 space-x-2 bg-gray-300 rounded-md hover:bg-gray-400 transition'
                                        >
                                            <span className='text-xs w-15'>
                                                {cameraOption.name}
                                            </span>     
                                            <span>
                                                <MdKeyboardArrowUp/>
                                            </span>                                       
                                        </button>
                                    </span>
                                    <button onClick={sendCameraAccess} className={`flex w-full px-4 h-full rounded-lg text-white cursor-pointer ${hoverStyle1}`}>
                                        <span className='flex items-center w-30 text-sm'>
                                           Enviar acesso à câmera 
                                        </span>
                                        
                                    </button>        
                                </span>   
                            )}
                            <button onClick={() => setModalState(false)} className='w-35 ml-auto mr-auto h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                                <p className='text-gray-700'>
                                    Voltar
                                </p>
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationDetails
