import React from 'react'
import EventCard from './ui/EventCard';
import ExportButton from './ui/ExportButton';

const HomeHistory = () => {

  return (
    <div>
      {/* Search Header */}
      <div className='w-full h-35 border-b-1 text-gray-300'>
        <div className='text-primary p-4'>
            <span className='flex justify-between'>
               <h1>Histórico de Relatório dos Eventos</h1> 
               <button>
                    <ExportButton text="Exportar Tudo"/>
               </button>
            </span>
            <h3 className=''>8 eventos encontrados</h3>
            {/* Search System */}
            <span>
                <input className='w-4/5 h-10' type="text" value="Escreva aqui"/>
                
            </span>
            
            
        </div>
        
      </div>
    </div>
  )
}

export default HomeHistory
