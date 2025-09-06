import React from 'react'
import EventCard from './ui/EventCard';
import ExportButton from './ui/ExportButton';

const TabHistory = () => {
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
                
                {/* Search System */}
                <span className='flex w-full mt-5 mb-5'>
                    <input className='w-3/4 h-8 pl-4 rounded-md text-gray-400 bg-gray-200 text-xs border-0 focus:shadow-md transition duration-200' type="text" value="Escreva aqui"/>
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
