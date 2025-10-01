import React from 'react'
import { useUserContext } from '../contexts/user-context';
import Avatar from './ui/Avatar';

const Message = ({text, sender}) => {
    const { userState, userDispatch } = useUserContext();
    // Se o usuário for igual ao sender, Coloca pra direita
    const positionClass = sender === userState ? "" : "ml-0";
    return (
        <span className='flex  w-full ml-auto mr-auto bg-amber-600'>
            <Avatar profileUrl={sender.profileUrl} customSize={"50"}/>
        </span>
    )
}

export default Message
