import React, { useState } from 'react'
import EventCard from './ui/EventCard';
import ExportButton from './ui/ExportButton';
import { IoSearchOutline } from "react-icons/io5";
import EventItem from './EventItem';
import { events } from '../assets/data/MonitorData'
import { IoIosArrowDown } from "react-icons/io";

const TabHistory = () => {
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
        {/* Search Header */}
        <div className='w-full h-fit'>

            {/* Search Box */}
            <div className='px-6 pt-6 border-b-1 text-gray-300'>

                <span className='flex h-fit justify-between text-primary'>
                    <span className='grid'>
                        <h1 className='h-fit'>Histórico de Relatório dos Eventos</h1> 
                        <h3 className='text-xs text-gray-400'>8 eventos encontrados</h3>
                    </span>
                    <button>
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
                        <button className='w-1/2 h-full ml-4'>
                            <div className='flex h-full pl-4 pr-4 items-center rounded-md bg-gray-100 justify-between'>
                                <h3>Todos os Tipos</h3>
                                <span><IoIosArrowDown/></span>
                            </div>                            
                        </button>
                        <button className='w-1/2 h-full'>
                            <div className='flex h-full pl-4 pr-4 items-center rounded-md bg-gray-100 justify-between'>
                                <h3>Todas as propriedades</h3>
                                <span><IoIosArrowDown/></span>
                            </div>                            
                        </button>
                    </span>
                </span>
            </div>
            <div className='space-y-3 mt-3 overflow-y-scroll max-h-120 p-5'>
                {events.map(e => (
                    <EventItem key={e.id} event={e} simplified={false}/>
                ))}                
            </div>

        </div>
    </div>
  )
}

export default TabHistory
