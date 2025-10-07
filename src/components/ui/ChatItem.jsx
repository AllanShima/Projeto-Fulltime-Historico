import React, { useState } from 'react'
import Avatar from './Avatar';

const ChatItem = ({ contact, selectedContact }) => {

    const clickedClass = selectedContact.id === contact.id ? "border-l-4 text-red-600 bg-gray-200 transition" : null;
    const fullName = contact.name + " " + contact.last_name;
    return (
        <div className={`absolute flex items-center w-full h-18 border-l-4 hover:bg-gray-200 transition ${clickedClass}`}>
            <span className='ml-4 rounded-2xl'>
                <Avatar fullName={fullName} showName={false} profileUrl={contact.profileUrl} customSize={"40"}/>
            </span>
            <span className='flex flex-col ml-2 text-left text-xs space-y-1 font-regular text-gray-900'>
                <span>
                    {fullName}
                </span>
                <span className='text-gray-500'>
                    (Última mensagem)
                </span>
            </span>
        </div>
    )
}

export default ChatItem
