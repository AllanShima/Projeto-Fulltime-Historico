import React from 'react'

const NotificationsDropdown = ({ Notifications }) => {
  return (
    <div className='fixed z-30 flex flex-col mt-12 w-fit h-fit p-3 bg-gray-100 rounded-lg shadow-xl'>
      <ul>
        {Notifications.map((notification, index) => (
          <li key={index}>
            <button 
          //   onClick={} 
              className='w-full p-2 outline-1 text-gray-200 hover:bg-white font-regular text-sm hover:cursor-pointer rounded-sm transition duration-400'>
              <span className='flex items-center justify-between text-primary'>
                {option.id === "LG" ? (
                  // Se o index for igual ao de "'L'ight and 'D'ark"
                  <span>
                    <ToggleSwitch state={langSwitchState}/>
                  </span>
                ) : (
                  <span>
                    <ToggleSwitch state={modeSwitchState}/>
                  </span>
                )}
                <span className='w-fit px-4 mr-auto ml-auto'>
                  {option.text}
                </span>
              </span>
            </button>                    
          </li>
        ))}
      </ul>
    </div>              
  )
}

export default NotificationsDropdown
