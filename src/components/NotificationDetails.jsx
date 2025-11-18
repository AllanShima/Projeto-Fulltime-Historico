import React from 'react'
import { BiSolidCameraOff } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import RecordingIndicator from './ui/RecordingIndicator';
import SeverityIndicator from './ui/SeverityIndicator';
import SoftwareIcon from './ui/SoftwareIcon';

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

const NotificationDetails = ({setModalState, selectedNotification}) => {

    const hoverStyle1 = "bg-linear-to-t from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 transition"

    const status = selectedNotification.status == "active" ? "Ativo" : "Inativo";
    const severity = severityOpt[selectedNotification.severity][0];
    return (
        <div className='fixed flex justify-center items-center top-0 bg-black/50 z-40 min-h-screen w-screen h-screen'>
            <div className='grid content-between w-fit h-fit bg-white rounded-2xl font-regular'>
            {/* Alert Details */}
                <div className='grid w-fit h-155 items-center'>
                    <div className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto px-7 py-3">
                        <span className='flex justify-between'>
                            <div>
                                <div className="flex items-center gap-2">
                                    <BiSolidCameraOff className="h-5 w-5 text-destructive" />
                                    <h1>Detalhes do {selectedNotification?.title || "Alerta"}</h1>
                                </div>
                                <h2>
                                    {selectedNotification?.description}
                                </h2>
                            </div>   
                            <span>
                                <SoftwareIcon title={selectedNotification.software_from}/> 
                            </span> 
                        </span>
                        
                        <div className="space-y-4 pt-4">
                        {/* Alert Status */}
                        <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                            <div className="flex items-center gap-3">
                            <div className="flex rounded-full bg-destructive content-center items-center" />
                                <span className='flex w-4 h-4 bg-amber-500'>
                                    <RecordingIndicator/>
                                </span>
                                
                                <div className='flex flex-col'>
                                    <p className="font-semibold text-destructive">Erro com a Câmera</p>
                                    <p className="text-xs text-muted-foreground">Status: {status}</p>
                                </div>
                            </div>
                            {/* <Badge variant="destructive">Erro</Badge> */}
                        </div>

                        {/* Location & Time Information */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                    <FiMapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Localização</span>
                                </div>
                                <p className="pl-6">{selectedNotification.location}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaRegClock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Horário do Alerta</span>
                                    </div>
                                    {/* // Converta o Timestamp para Date antes de chamar toLocaleString() */}
                                <p className="pl-6">{selectedNotification.date.toDate().toLocaleString()}</p> 
                            </div>
                        </div>

                        {/* Diagnostics Data */}
                        <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2">
                            <FiActivity className="h-4 w-4" />
                            Diagnóstico do Sistema
                            </h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-3 bg-secondary rounded-lg">
                                <p className="text-muted-foreground">Severidade do Alerta</p>
                                <SeverityIndicator severity={selectedNotification.severity} layout2={false}/>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                                <p className="text-muted-foreground">Transmissão de Vídeo</p>
                                <p className="text-destructive font-semibold">Sem Sinal</p>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                                <p className="text-muted-foreground">Última Conexão</p>
                                <p className="font-semibold">5 min atrás</p>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                                <p className="text-muted-foreground">Tempo Offline</p>
                                <p className="font-semibold">5 min 12 seg</p>
                            </div>
                            </div>
                        </div>

                        {/* Error Assessment */}
                        <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2">
                            <FiAlertTriangle className="h-4 w-4" />
                            Análise do Erro
                            </h4>
                            <div className="p-3 bg-secondary rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tipo de Erro:</span>
                                    <span className="text-destructive font-semibold">{selectedNotification.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Causa Provável:</span>
                                    <span>NãoSei</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Actions */}
                        <div className="space-y-2">
                            <h4 className="font-semibold">Ações Recomendadas</h4>
                            <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>Verificar alimentação elétrica da câmera</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>Testar conectividade de rede no local</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>Reiniciar o equipamento da câmera</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>Verificar cabos e conexões físicas</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>Contatar equipe de manutenção se o problema persistir</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>Registrar ocorrência no sistema de tickets</span>
                            </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex justify-between px-10 w-full h-10'>
                            <button className={`w-fit px-4 h-full rounded-lg text-white cursor-pointer ${hoverStyle1}`}>
                                Enviar acesso à câmera
                            </button>
                            <button onClick={() => setModalState(false)} className='w-40 h-full bg-red-200 rounded-lg outline-1 text-red-500 hover:bg-red-300 hover:cursor-pointer transition'>
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

export default NotificationDetails
