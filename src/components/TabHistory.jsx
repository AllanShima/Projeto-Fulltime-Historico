import React, { useState } from 'react'
import EventCard from './ui/EventCard';
import ExportButton from './ui/ExportButton';
import { IoSearchOutline } from "react-icons/io5";

const TabHistory = () => {
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
        {/* Search Header */}
        <div className='w-full h-fit border-b-1 text-gray-300'>
            <div className='text-primary px-6 pt-6'>
                <span className='flex h-fit justify-between'>
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
                    <span className={`flex w-3/4 h-8 items-center rounded-md text-gray-400 bg-gray-200 text-xs border-0 focus:shadow-md transition duration-200 
                    ${isFocused === true ? ("outline-2 outline-gray-600") : ("")}`}>
                        <span className='flex items-center justify-center w-10 h-full border-r-2 text-gray-300'>
                           <IoSearchOutline className='w-4 h-4 text-gray-700'/> 
                        </span>
                        <input className='w-full h-full focus:outline-none pl-4 text-gray-900' type="text" 
                        value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Procura algum relatório específico?'
                        onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
                    </span>
                    
                    <span className='flex w-1/4 space-x-4 text-sm'>
                        <div className='flex w-1/2 ml-4 pl-4 items-center rounded-md bg-gray-200'>
                            <h3>Todos os Tipos</h3>
                        </div>
                        <div className='flex w-1/2 pl-4 items-center rounded-md bg-gray-200'>
                            <h3>Todas as Prioridades</h3>
                        </div>
                    </span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default TabHistory
