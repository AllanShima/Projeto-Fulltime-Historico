import React, { useEffect } from 'react'
import NotificationCard from '../NotificationCard'

const NotificationsDropdown = ({ notifications, setShowResponseModal, setShowDetailsModal }) => {
  console.log(notifications);
  return (
    <div className='fixed z-10 flex flex-col mt-2 mr-20 w-70 h-fit bg-white rounded-lg shadow-md outline-1 text-gray-300'>
      {notifications.length >= 1 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <NotificationCard 
              notification={notification} 
              setShowResponseModal={setShowResponseModal} 
              setShowDetailsModal={setShowDetailsModal}
              />   
            </li>
          ))}
        </ul>        
      ) : (
        <div className='flex w-full justify-center'>
          <h2 className='p-2'>
            Não há notificações
          </h2>          
        </div>

      )}

    </div>              
  )
}

export default NotificationsDropdown
