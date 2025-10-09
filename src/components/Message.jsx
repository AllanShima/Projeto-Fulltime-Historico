import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/user-context';
import Avatar from './ui/Avatar';

const Message = ({message}) => {
    const { userState, userDispatch } = useUserContext();
    const messageText = message.text;
    const userWithUid = message.userWith?.uid;
    // Se o usuário for igual ao sender, Coloca pra direita
    const positionClass = userWithUid !== userState.uid ? "ml-auto mr-0 justify-end" : "mr-auto ml-0";

    const [senderFullname, setSenderFullname] = useState("Null Null");

    useEffect(() => {
        if(message){
            setSenderFullname(message.userWith?.first + " " + message.userWith?.last);
        }
    }, []);
    
    return (
        <div className='flex flex-col h-fit mt-4'>
            <span className={`flex w-full ${positionClass}`}>
                {userWithUid === userState.uid ? (
                    <span className='flex w-fit items-center space-x-2'>
                        <Avatar fullName={senderFullname} customSize={"50"}/>
                        <span className='w-fit h-fit max-w-5/6 p-2.5 rounded-2xl outline-2 outline-red-600'>
                            <p className='font-regular text-primary'>{messageText}</p>                    
                        </span>
                    </span>
                ) : (
                    <span className='flex w-fit items-center space-x-2'>
                        <span className='w-fit h-fit max-w-5/6 p-2.5 rounded-2xl bg-red-500'>
                            <p className='font-regular text-white'>{messageText}</p>                    
                        </span>
                        <Avatar fullName={senderFullname} customSize={"50"}/>
                    </span>
                )}
            </span>            
        </div>

    )
}

export default Message
