import React from 'react'
import SidebarUser from './SidebarUser'
import HomeUser from './HomeUser'
import {userEvents} from '../assets/data/TempData'

const WindowUser = () => {
  return (
    <>
      <div className='flex flex-1 w-full'>
        <div className='w-1/2 h-full'>
          <SidebarUser userEvents={userEvents}/>
        </div>
        
        <div className='w-1/2'>
          <HomeUser />
        </div>
        
      </div>    
    </>
  )
}

export default WindowUser
