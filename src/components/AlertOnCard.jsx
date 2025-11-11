import React from 'react'

const AlertOnCard = ({alert}) => {
  return (
    <div className='w-50 h-30 p-2 bg-orange-100 rounded-2xl'>
      <div className='w-full h-full border-1 text-orange-300 rounded-xl text-sm'>
        <div>
          <h2>Alerta de {alert.title}</h2>
          <p>Por {"Alanzoka"}</p>
        </div>
      </div>      
    </div>

  )
}

export default AlertOnCard
