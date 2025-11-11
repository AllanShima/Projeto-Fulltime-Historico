import React, { useEffect } from 'react'

const NotificationsDropdown = ({ notifications }) => {
  
  return (
    <div className='fixed z-30 flex flex-col mt-12 w-fit h-fit p-3 bg-gray-100 rounded-lg shadow-xl'>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <div>
              <h1>{notification.title}</h1>
            </div>                  
          </li>
        ))}
      </ul>
    </div>              
  )
}

export default NotificationsDropdown
