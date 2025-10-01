import React, { useEffect, useState } from 'react'
import { contacts } from '../assets/data/TempData' 
import ChatItem from './ui/ChatItem';
import Message from './Message';
// monitoring = true: pra mostrar os contatos de usuários somente
// monitoring = false: pra mostrar os contatos somente de monitores
const LiveChatComponent = ({ monitoring=true }) => {

    const [selectedContact, setSelectedContact] = useState({});
    const newContacts = monitoring 
        ? contacts.filter(contact => contact.role === "user") 
        : contacts.filter(contact => contact.role === "monitor");

    const messages = [
        { id: 1, text: 'Hello!', sender: selectedContact },
        { id: 2, text: 'Hi there!', sender: 'bot' },
    ];

    return (
        <div className='flex w-full h-full bg-gray-100'>
            {/* Conversas */}
            <div className='flex flex-col p-1 w-1/3 space-y-1 border-r-1 text-gray-200'>
                {/* Header */}
                <div className='flex w-full h-15 items-center justify-between text-md border-b-1 text-gray-300 font-bold'>
                    <h1 className='ml-4 text-primary'>Conversas</h1>
                    <h1 className='mr-4 text-gray-600'>{newContacts.length}</h1>
                </div>
                {/* Contatos */}
                <div className='flex flex-col w-full h-full space-y-18 rounded-sm'>
                    {newContacts.map(contact => (
                        <button onClick={() => setSelectedContact(contact)} className={`relative w-full h-fit bg-amber-500`}>
                            <ChatItem contact={contact} selectedContact={selectedContact}/>
                        </button>
                    ))}
                </div>
            </div>
            <div className='w-2/3 p-3 h-full bg-white'>
                {Object.keys(selectedContact).length !== 0 ? (
                    <div className='flex flex-col border-b-1 text-gray-300 w-full h-full bg-amber-400'>
                        <div className='flex items-center w-full h-12 border-b-1 text-gray-300'>
                            <h1 className='w-fit h-fit text-lg font-bold ml-auto mr-auto text-primary'>
                                {selectedContact.name + " " + selectedContact.last_name}
                            </h1>      
                        </div>
                        <div className='flex flex-col w-full h-full bg-black'>
                            <div className='relative flex flex-col h-fit mt-2'>
                                <h3 className='z-10 w-fit px-2 ml-auto mr-auto bg-amber-50 text-xs'>
                                    Conversa iniciada: Hoje, 03:12
                                </h3>
                                {/* Linha horizontal */}
                                <div className='z-0 absolute w-full h-[0.4px] my-2 bg-gray-300'></div>       
                            </div>
                            <div className='flex flex-col p-2 w-full h-full bg-amber-100'>
                                {messages.map(message => (
                                    <Message key={message.id} text={message.text} sender={message.sender}/>
                                ))}
                            </div>
                        </div>
                    </div>                           
                ): (
                    // Se não tiver nada selecionado
                    <div className='flex ml-auto mr-auto w-fit h-full items-center'>
                        <h1 className='text-gray-500 text-lg font-bold'>Converse com os Usuários!</h1>
                    </div>
                )}
            </div>


        </div>
    )
}

export default LiveChatComponent
