import React from 'react'
import SidebarUser from './SidebarUser'
import HomeUser from './HomeUser'
import {userEvents} from '../assets/data/TempData'

const WindowUser = () => {
  return (
    <>
      <div className='flex flex-1 bg-white'>
        <SidebarUser userEvents={userEvents}/>
        <HomeUser />
      </div>    
    </>
  )
}

export default WindowUser
