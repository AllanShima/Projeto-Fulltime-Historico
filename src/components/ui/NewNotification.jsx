import React from 'react'

const NewNotification = ({notifications}) => {
  const amount = notifications.filter(notification => notification.visualized == false).length;
  return (
    <div className='flex w-5 h-5 rounded-full items-center justify-center bg-red-600 text-white text-xs font-light'>
      {amount}
    </div>
  )
}

export default NewNotification
