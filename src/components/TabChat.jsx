import React, { useState } from 'react'
import ChatItem from './ui/ContactItem'
import LiveChatComponent from './LiveChatComponent';
import GoogleMapsComponent from './GoogleMapsComponent';

const TabChat = () => {
    return (
        <div className='flex w-full h-full'>
            {/* Sidebar */}
            <div className='w-1/2'>
                <LiveChatComponent monitoring={true}/>
            </div>

            {/* Google maps  */}
            <div className='w-1/2'>
                <GoogleMapsComponent/>
            </div>
        </div>
    )
}

export default TabChat
