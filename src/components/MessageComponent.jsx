import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useUserContext } from '../contexts/user-context';
import { firebaseGetMessages } from '../services/api/FirebaseGetFunctions';
import { firebaseSetMessages } from '../services/api/FirebaseSetFunctions';

const MessageComponent = ({ selectedContact }) => {
    const [messages, setMessages] = useState([{}])
    const [textareaValue, setTextAreaValue] = useState("");
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const { userState, userDispatch } = useUserContext();

    const messagesEndRef = useRef(null);

    // ----
    // Fazer um update das mensagens toda vez que:

    // Que a coleção do contato selecionado atualizar (escutar as mensagens que ele está enviando e atualizar p mim)

    // 1. Defina a referência da coleção
    const userMessagesCollection = (userState.first + "_" + userState.last).toLowerCase();
    const senderChatCollectionRef = collection(db, "users", selectedContact.uid, "chats", userMessagesCollection, "messages");

    // 2. Configure o ouvinte em tempo real
    const unsubscribe = onSnapshot(senderChatCollectionRef, (snapshot) => {
        // Este código é executado em tempo real a cada mudança!

        console.log("A coleção de mensagens foi alterada/atualizada!");
        
        firebaseGetMessages(selectedContact, userState)
            .then(messages => {
                // Este bloco é executado quando a Promise resolve
                // console.log("Mensagens encontradas:", messages);
                setMessages(messages);
            })
            .catch(error => {
                // Trata qualquer erro não capturado pelo seu try/catch interno
                console.error("Erro no update de mensagens:", error);
            });
    });

    const setMessagesFunction = () => {
        // Envia somente se tiver alguma coisa
        if(textareaValue != ""){
            firebaseSetMessages(selectedContact, textareaValue, userState);
            setTextAreaValue("");
            firebaseGetMessages(selectedContact)
                .then(messages => {
                    // Este bloco é executado quando a Promise resolve
                    console.log("Resultado final:", messages);
                    setMessages(messages);
                    // Você pode chamar um setState aqui, ex: setNewContacts(contatos);
                })
                .catch(error => {
                    // Trata qualquer erro não capturado pelo seu try/catch interno
                    console.error("Erro na chamada:", error);
                });            
        } else {
            window.alert("Não há mensagem...");
        }
    }

    useEffect(() => {
        // Executar toda vez que o contato selecionado mudar;
        // parar de escutar
        unsubscribe();
    }, [selectedContact])

    // Que o componente iniciar
    useEffect(() => {
        firebaseGetMessages(selectedContact, userState)
            .then(messages => {
                // Este bloco é executado quando a Promise resolve
                // console.log("Mensagens encontradas:", messages);
                setMessages(messages);
                // Você pode chamar um setState aqui, ex: setNewContacts(contatos);
            })
            .catch(error => {
                // Trata qualquer erro não capturado pelo seu try/catch interno
                console.error("Erro no update de mensagens:", error);
            });
        return () => {
            unsubscribe();
        };
    }, [])

    useEffect(() => {
        // Toda vez que as mensagens atualiza, ele scrolla pra baixo automaticamente
        // Só executa se o ref estiver conectado a algum elemento
        if (messagesEndRef.current) {
            // Seta a posição do scroll pela a altura total do conteudo
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <div className='flex flex-col border-b-1 text-gray-300 w-full h-full'>
            <div className='flex items-center w-full h-12 border-b-1 text-gray-300'>
                <h1 className='w-fit h-fit text-lg font-bold ml-auto mr-auto text-primary'>
                    {selectedContact.first + " " + selectedContact.last}
                </h1>      
            </div>
            <div className='flex flex-col w-full h-full'>
                {messages.length !== 0 ? (
                    <>
                        <div className='relative flex flex-col h-fit mt-2'>
                            <h3 className='z-10 w-fit px-2 ml-auto mr-auto bg-white text-xs text-gray-700'>
                                Conversa iniciada: Hoje, 03:12
                            </h3>
                            {/* Linha horizontal */}
                            <div className='z-0 absolute w-full h-[0.4px] my-2 bg-gray-300'></div>       
                        </div>
                        <div className='flex flex-col w-full h-full py-4'>
                            <div ref={messagesEndRef} className='flex flex-col w-full px-4 overflow-auto grow h-0'>
                                {messages.map((message, index) => (
                                    <Message key={index} message={message} senderContact={selectedContact}/>
                                ))}        
                            </div>
                            
                            <div className='flex w-full h-20 mt-4 px-4 space-x-2 '>
                                <div className='w-full h-full'>
                                    <div className={`w-full h-full outline-2 text-gray-400 rounded-lg transition ${isTextareaFocused ? ("outline-2 outline-gray-600") : ("")}`}>
                                        <textarea name="message" rows="5" cols="40" 
                                        onFocus={() => setIsTextareaFocused(true)} 
                                        onBlur={() => setIsTextareaFocused(false)}
                                        placeholder="Escreva sua mensagem aqui..." 
                                        value={textareaValue} 
                                        onChange={(e) => setTextAreaValue(e.target.value)} 
                                        className='w-full h-full focus:outline-none resize-none text-gray-600 p-2'/>
                                    </div>
                                </div>   

                                <span className='flex items-end w-fit h-full'>
                                    <button onClick={() => setMessagesFunction()} className='w-fit p-2 text-white bg-red-500 rounded-lg cursor-pointer'>
                                        Enviar
                                    </button>                                           
                                </span>
                            </div>
                        </div>                            
                    </>
                ) : (
                    <div className='grid content-between w-full h-full'>
                        <div>
                            Comece a mandar mensagens!
                        </div>
                            <div className='flex w-full h-20 mt-4 px-4 mb-4 space-x-2'>
                                <div className='w-full h-full'>
                                    <div className={`w-full h-full outline-2 text-gray-400 rounded-lg transition ${isTextareaFocused ? ("outline-2 outline-gray-600") : ("")}`}>
                                        <textarea name="message" rows="5" cols="40" 
                                        onFocus={() => setIsTextareaFocused(true)} 
                                        onBlur={() => setIsTextareaFocused(false)}
                                        placeholder="Escreva sua mensagem aqui..." 
                                        value={textareaValue} 
                                        onChange={(e) => setTextAreaValue(e.target.value)} 
                                        className='w-full h-full focus:outline-none resize-none text-gray-600 p-2'/>
                                    </div>
                                </div>   

                                <span className='flex items-end w-fit h-full'>
                                    <button onClick={() => setMessagesFunction()} className='w-fit p-2 text-white bg-red-500 rounded-lg cursor-pointer'>
                                        Enviar
                                    </button>                                           
                                </span>
                            </div>  
                    </div>
                )}

            </div>
        </div>     
    )
}

export default MessageComponent
