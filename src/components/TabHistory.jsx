import React, { useEffect, useState } from 'react'
import ExportButton from './ui/ExportButton';
import { IoSearchOutline } from "react-icons/io5";
import EventCardMonitor from './ui/EventCardMonitor';
// import { events } from '../assets/data/TempData'
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import PdfViewer from './PdfViewer';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../services/firebase';

const TabHistory = () => {
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showExportAllModal, setShowExportAllModal] = useState(false);

    const [showPropDropdown, setShowPropDropdown] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const types = [
        "Todos os Tipos",
        "Movimento",
        "Alerta",
        "Sistema",
        "Acesso",
        "Instruso"
    ]
    const severities = [
        "Todas as Propriedades",
        "Baixo",
        "Médio",
        "Alto",
        "Critico"
    ]

    const hoverStyle1 = "bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:cursor-pointer transition duration-200";
    const hoverStyle2 = "bg-linear-to-t from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 hover:cursor-pointer transition duration-200";

    const [currentType, setCurrentType] = useState(types[0]);
    const [currentProp, setCurrentProp] = useState(severities[0]);  

    const SelectedProp = (severity) => {
        setCurrentProp(severity);
        setShowPropDropdown(false);
    }

    const SelectedType = (type) => {
        setCurrentType(type);
        setShowTypeDropdown(false);
    }

    const downloadAllReports = () => {
        setShowExportAllModal(false);
        window.alert("baixando relatórios...");
    }

    const [events, setEvents] = useState([]);
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
            setEvents(newEvents);
        } else {
            // Opcional: Adicionar lógica se todos os alertas forem removidos
            setEvents([]);
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
        <div className='flex flex-1 w-full bg-amber-600'>
            {showExportModal && (
                <PdfViewer setShowModal={setShowExportModal} selectedEvent={selectedEvent}/>
            )}
            {showExportAllModal && (
                <div className='fixed flex justify-center items-center top-0 bg-black/50 z-20 min-h-screen w-screen h-screen'>
                    <div className='grid content-between w-120 h-40 p-5 bg-white rounded-2xl font-regular'>
                        <h1 className='w-full text-center'>Tem certeza?</h1>
                        <p className='text-center text-sm text-gray-600'>Baixar todos os relatórios</p>
                        <div className='flex justify-between px-10 w-full h-10'>
                        <button onClick={downloadAllReports} className={`w-40 h-full rounded-lg text-white ${hoverStyle1}`}>
                            Baixar
                        </button>
                        <button onClick={() => setShowExportAllModal(false)} className='w-40 h-full bg-gray-200 rounded-lg hover:bg-gray-300 transition'>
                            Cancelar
                        </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className='flex w-full bg-white'>
                {/* Search Header */}
                <div className='w-full h-fit'>
                    {/* Search Box */}
                    <div className='px-6 pt-6 border-b-1 text-gray-300'>

                        <span className='flex h-fit justify-between text-primary'>
                            <span className='grid'>
                                <h1 className='h-fit'>Histórico de Relatório dos Eventos</h1> 
                                <h3 className='text-xs text-gray-400'>{events.length} {events.length > 1 ? "Eventos encontrados" : "Evento encontrado"}</h3>
                            </span>
                            <button onClick={() => setShowExportAllModal(!showExportAllModal)}>
                                <ExportButton text="Exportar Tudo"/>
                            </button>
                        </span>
                        
                        {/* Sistema de procura */}
                        <span className='flex w-full mt-5 mb-5'>
                            <span className={`flex w-3/4 h-8 items-center rounded-md text-gray-400 bg-gray-100 text-xs border-0 focus:shadow-md transition duration-200 
                            ${isFocused === true ? ("outline-2 outline-gray-600") : ("")}`}>
                                <span className='flex items-center justify-center w-10 h-full border-r-2 text-gray-300'>
                                <IoSearchOutline className='w-4 h-4 text-gray-700'/> 
                                </span>
                                <input className='w-full h-full focus:outline-none pl-4 text-gray-900' type="text" 
                                value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Procura algum relatório específico?'
                                onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
                            </span>
                            
                            <span className='flex w-1/4 space-x-4 text-xs text-primary'>
                                <span className='flex flex-col w-1/2 h-full ml-4'>
                                    <button onClick={() => setShowTypeDropdown(!showTypeDropdown)} className='w-full h-full'>
                                        <div className='flex h-full pl-4 pr-4 items-center rounded-md bg-gray-100 justify-between'>
                                            <h3>{currentType}</h3>
                                            <span><IoIosArrowDown/></span>
                                        </div>                            
                                    </button>     
                                    {showTypeDropdown && (
                                        <div className='flex fixed z-30 flex-col mt-12 w-fit h-fit p-3 bg-gray-100 rounded-lg shadow-xl'>
                                            <ul className='p-0.5'>
                                                {types.map(type => (
                                                    <li>
                                                        <button onClick={() => SelectedType(type)} className='w-full p-2 hover:bg-gray-300 transition rounded-md'>
                                                            <span className='flex items-center justify-between'>
                                                                <h3 className='text-left text-md font-regular'>{type}</h3>  
                                                                <span className={`ml-3 text-md ${type == currentType ? "text-gray-500" : "text-white/0"}`}>
                                                                   <FaCheck/>     
                                                                </span>
                                                            </span>
                                                        </button>
                                                    </li>                                                    
                                                ))}
                                            </ul>
                                        </div>                                          
                                    )}                             
                                </span>
                                <span className='flex flex-col w-1/2 h-full'>
                                    <button onClick={() => setShowPropDropdown(!showPropDropdown)} className='w-full h-full'>
                                        <div className='flex h-full pl-4 pr-4 items-center rounded-md bg-gray-100 justify-between'>
                                            <h3>{currentProp}</h3>
                                            <span><IoIosArrowDown/></span>
                                        </div>                            
                                    </button>
                                    {showPropDropdown && (
                                        <div className='flex fixed z-30 flex-col mt-12 w-fit h-fit p-3 bg-gray-100 rounded-lg shadow-xl'>
                                            <ul className='w-full h-full space-y-0.5'>
                                                {severities.map(severity => (
                                                    <li>
                                                        <button onClick={() => SelectedProp(severity)} className='w-full p-2 hover:bg-gray-300 transition rounded-md'>
                                                            <span className='flex items-center justify-between'>
                                                                <h3 className='text-left text-md font-regular'>{severity}</h3>  
                                                                <span className={`ml-3 text-md ${severity == currentProp ? "text-gray-500" : "text-white/0"}`}>
                                                                   <FaCheck/>     
                                                                </span>
                                                            </span>
                                                        </button>
                                                    </li>                                                    
                                                ))}
                                            </ul>
                                        </div>                                            
                                    )}                                        
                                </span>
                            </span>
                        </span>
                    </div>
                    <div className='space-y-3 mt-3 overflow-y-scroll max-h-115 p-5'>
                        {events.map(e => (
                            <EventCardMonitor 
                            key={e.id} 
                            event={e} 
                            simplified={false} 
                            setStateModal={setShowExportModal} 
                            stateModal={showExportModal}
                            setSelectedEvent={setSelectedEvent} 
                            />                           
                        ))}                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabHistory
