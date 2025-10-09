import React from 'react'
import { useUserContext } from '../contexts/user-context';
import Avatar from './ui/Avatar';

const Message = ({message}) => {
    const { userState, userDispatch } = useUserContext();
    const messageText = message.text;
    const userWithUid = message.userWith?.uid;
    // Se o usuário for igual ao sender, Coloca pra direita
    const positionClass = userWithUid !== userState.uid ? "ml-auto mr-0" : "mr-auto ml-0";

    const senderFullname = "teste";
    
    return (
        <div className='flex flex-col h-fit mt-4'>
            <span className={`max-w-1/2 ${positionClass}`}>
                {userWithUid === userState.uid ? (
                    <span className='flex w-fit items-center space-x-2'>
                        <Avatar customSize={"50"}/>
                        <span className='w-fit h-fit p-3 rounded-2xl outline-2 outline-red-600'>
                            <p className='font-regular text-primary'>{messageText}</p>                    
                        </span>
                    </span>
                ) : (
                    <span className='flex w-fit items-center space-x-2'>
                        <span className='w-fit h-fit p-3 rounded-2xl bg-red-500'>
                            <p className='font-regular text-white'>{messageText}</p>                    
                        </span>
                        <Avatar customSize={"50"}/>
                    </span>
                )}
            </span>            
        </div>

    )
}

export default Message
