import React, { useEffect, useState } from 'react'
import Message from './Message'
import { addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from '../contexts/user-context';

const MessageComponent = ({ selectedContact }) => {
    const [messages, setMessages] = useState([{}])
    const [textareaValue, setTextAreaValue] = useState("");
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const { userState, userDispatch } = useUserContext();

    const updateMessages = async(selectedContact) => {
        // Verifica se há algum documento na coleção
        // Definindo referencia da coleção das mensagens

        // Defining the ID of the message
        // 1. Define the collection references (already done)
        const userMessagesCollection = (userState.first + "_" + userState.last).toLowerCase();
        const senderMessagesCollection = (selectedContact.first + "_" + selectedContact.last).toLowerCase();

        const senderChatCollectionRef = collection(db, "users", selectedContact.uid, "chats", userMessagesCollection, "messages");
        const userChatCollectionRef = collection(db, "users", userState.uid, "chats", senderMessagesCollection, "messages");

        // 2. Define the queries (already done, but sorting *before* combining is often good practice)
        // Note: We use orderBy("createdAt", "desc") in the queries as well for efficiency,
        // although the final combined sort ensures the overall order.
        const q1 = query(senderChatCollectionRef,
            orderBy("createdAt", "desc")
        );
        const q2 = query(userChatCollectionRef,
            orderBy("createdAt", "desc")
        );

        // 3. Execute the queries and get the snapshots
        const snapshot1 = await getDocs(q1); // Changed variable name for clarity
        const snapshot2 = await getDocs(q2);

        // 4. Combine and Map the data
        // Extract the data from both snapshots into arrays, including the document ID if needed.
        const allMessages = [];

        // Process snapshot1
        snapshot1.forEach(doc => {
            allMessages.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Process snapshot2
        snapshot2.forEach(doc => {
            allMessages.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // 5. Sort the combined array by 'createdAt' in descending order
        // Note: The 'createdAt' property must be a proper Date object or a comparable value (like a Firebase Timestamp)
        // If it's a Firebase Timestamp, you might need to use its toDate() method for accurate comparison.
        const combinedAndSortedMessages = allMessages.sort((a, b) => {
            // Assuming 'createdAt' is a Firebase Timestamp object, convert to milliseconds for comparison
            const timeA = a.createdAt.toMillis();
            const timeB = b.createdAt.toMillis();
            // Para uma ordem crescente (Mais velho primeiro), subtraia B de A
            return timeA - timeB;
        });

        return combinedAndSortedMessages;
    };

    const storeNewMessage = async() => {
        try {
            // Defining the ID of the message
            // 1. Define the reference to the subcollection
            const senderFullnameCollection = (selectedContact.first + "_" + selectedContact.last).toLowerCase();
            const chatCollectionRef = collection(db, "users", userState.uid, "chats", senderFullnameCollection, "messages");

            // 2. Query for the document with the highest 'id'
            const q = query(chatCollectionRef,
                orderBy("id", "desc"), // Sort by 'id' in descending order
                limit(1)             // Only get the top document
            );

            // 3. Execute the query
            const snapshot = await getDocs(q);

            // 4. Determine the next 'id'
            let nextId = 1; // Default starting ID if the collection is empty

            if (!snapshot.empty) {
                // Get the 'id' from the first (and only) document in the result
                const lastDoc = snapshot.docs[0].data();
                const maxId = lastDoc.id;

                // Calculate the next ID (maxId + 1)
                nextId = maxId + 1;
            }

            const docRef = await addDoc(chatCollectionRef, {
                id: nextId,
                text: textareaValue,
                userWith: selectedContact,
                createdAt: new Date()
            });

            setTextAreaValue("");

            updateMessages(selectedContact)
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
            // id é o id do nome do documento inserido no banco, n o id do doc em si
            console.log("Mensagem Inserida com o ID: ", docRef.id);
        } catch (e) {
            console.error("Erro ao adicionar a mensagem: ", e);
        }
    }

    useEffect(() => {
        updateMessages(selectedContact)
            .then(messages => {
                // Este bloco é executado quando a Promise resolve
                console.log("Mensagens encontradas:", messages);
                setMessages(messages);
                // Você pode chamar um setState aqui, ex: setNewContacts(contatos);
            })
            .catch(error => {
                // Trata qualquer erro não capturado pelo seu try/catch interno
                console.error("Erro no update de mensagens:", error);
            });
    }, [])

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
                            <div className='flex flex-col w-full px-4 overflow-auto grow h-0'>
                                {messages.map(message => (
                                    <Message key={message.id} message={message}/>
                                ))}        
                            </div>
                            
                            <div className='flex w-full h-20 mt-4 px-4 space-x-2'>
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
                                    <button onClick={storeNewMessage} className='w-fit p-2 text-white bg-red-500 rounded-lg cursor-pointer'>
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
                        <div className='grid content-between w-full h-full  p-2 bg-amber-100'>
                            <div className='flex w-full h-20 p-2 space-x-2 bg-amber-300'>
                                <div className='w-full h-full'>
                                    <textarea name="message" rows="5" cols="40" placeholder="Escreva sua mensagem aqui..." value={textareaValue} onChange={(e) => setTextAreaValue(e.target.value)} className='w-full h-full resize-none text-primary p-2'/>
                                </div>   

                                <span className='flex items-end w-fit h-full'>
                                    <button onClick={storeNewMessage} className='w-fit p-2 text-white bg-red-500 rounded-lg cursor-pointer'>
                                        Enviar
                                    </button>                                           
                                </span>
                            </div>
                        </div>   
                    </div>
                )}

            </div>
        </div>     
    )
}

export default MessageComponent
