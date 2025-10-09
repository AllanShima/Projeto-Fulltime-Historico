import React, { useState } from 'react'
import ChatItem from './ui/ContactItem'
import LiveChatComponent from './LiveChatComponent';

const TabChat = () => {
    return (
        <div className='flex w-full h-full'>
            {/* Sidebar */}
            <div className='w-1/2'>
                <LiveChatComponent monitoring={true}/>
            </div>

            {/* Google maps  */}
            <div className='w-1/2 bg-amber-900'>
                <h1>frsrfs</h1>
            </div>
        </div>
    )
}

export default TabChat
