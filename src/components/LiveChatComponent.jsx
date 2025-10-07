import React, { useEffect, useState } from 'react'
// import { contacts } from '../assets/data/TempData' 
import ChatItem from './ui/ChatItem';
import Message from './Message';
import { useUserContext } from '../contexts/user-context';
import { db } from '../firebase';
import { addDoc, getDocs, query, collection, orderBy, limit } from 'firebase/firestore';
// monitoring = true: pra mostrar os contatos de usuários somente
// monitoring = false: pra mostrar os contatos somente de monitores

// contacts:
// {
//     id: "1",
//     name: "Cleber",
//     last_name: "Josh",
//     role: "monitor",
//     profileUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg"
// }

const LiveChatComponent = ({ monitoring=true }) => {

    const { userState, userDispatch } = useUserContext();

    const [contacts, setContacts] = useState([{}]);
    const [selectedContact, setSelectedContact] = useState({});
    const [newContacts, setNewContacts] = useState([{}]);

    const [messages, setMessages] = useState([{}]);

    // var messages = [
    //     { id: 1, text: 'Hello!', sender: selectedContact },
    //     { id: 2, text: 'Hi there!', sender: userState },
    // ];

    // Atualizar Lista de contatos(usuários)
    const searchContacts = async() => {
        const userCollection = (userState.first + userState.last).toLowerCase();
        const chatCollectionRef = collection(db, "users", userCollection);
        
        // 2. Pegando o resultado a partir da query
        const q = query(chatCollectionRef, where("uid", "==", uid));

        // 3. Pegando o resultado a partir da query
        const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
            // Pega o primeiro documento do array de resultados (como o UID é único, é o que queremos)
            setContacts(querySnapshot.docs);
            // Retorna o objeto de dados do documento.

            setNewContacts(monitoring 
                    ? contacts.filter(contact => contact.role === "user") 
                    : contacts.filter(contact => contact.role === "monitor"));

          return userDoc.data();
      } else {
          // O documento não existe.
          console.log("Nenhum usuário encontrado com este UID!");
          return null;
      }
    };

    const [textareaValue, setTextAreaValue] = useState("");

    const updateMessages = async(selectedContact) => {
        // Defining the ID of the message
        // 1. Define the collection references (already done)
        const senderChatCollectionRef = collection(db, "users", selectedContact.uid, "chat_messages", userState.fullName);
        const userChatCollectionRef = collection(db, "users", userState.uid, "chat_messages", senderFullname);

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

            // For descending order (Newest first), subtract A from B
            return timeB - timeA;
        });

        setMessages(combinedAndSortedMessages);
    };

    const storeNewMessage = async() => {
        try {
            // Defining the ID of the message
            // 1. Define the reference to the subcollection
            const senderFullname = (selectedContact.first + "_" + selectedContact.last).toLowerCase();
            const chatCollectionRef = collection(db, "users", userState.uid, "chat_messages", senderFullname);

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
            // id é o id do nome do documento inserido no banco, n o id do doc em si
            console.log("Mensagem Inserida com o ID: ", docRef.id);
        } catch (e) {
            console.error("Erro ao adicionar a mensagem: ", e);
        }
    }

    // Atualizar a lista de contatos
    useEffect(() => {
        console.log(userState);
        setContacts(searchContacts());
    }, [])

    useEffect((selectedContact) => {
        updateMessages(selectedContact);
    }, [selectedContact])

    return (
        <div className='flex w-full h-full bg-gray-100'>
            {/* Conversas */}
            <div className='flex flex-col w-1/3 space-y-1 border-r-1 text-gray-200'>
                {/* Header */}
                <div className='flex w-full h-15 items-center justify-between text-md border-b-1 text-gray-300 font-bold'>
                    <h1 className='ml-4 text-primary'>Conversas</h1>
                    <h1 className='mr-4 text-gray-600'>{newContacts.length}</h1>
                </div>
                {/* Contatos */}
                <div className='flex flex-col w-full h-full space-y-18 rounded-sm'>
                    {newContacts.map(contact => (
                        <button key={contact.id} onClick={() => setSelectedContact(contact)} className={`relative w-full h-fit bg-amber-500`}>
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
                        <div className='flex flex-col w-full h-full'>
                            <div className='relative flex flex-col h-fit mt-2'>
                                <h3 className='z-10 w-fit px-2 ml-auto mr-auto bg-amber-50 text-xs'>
                                    Conversa iniciada: Hoje, 03:12
                                </h3>
                                {/* Linha horizontal */}
                                <div className='z-0 absolute w-full h-[0.4px] my-2 bg-gray-300'></div>       
                            </div>
                            <div className='grid content-between w-full h-full p-2 bg-amber-100'>
                                <div className='flex flex-col w-full h-fit bg-amber-700'>
                                    {messages.map(message => (
                                        <Message key={message.id} text={message.text} sender={message.sender}/>
                                    ))}                                    
                                </div>
                                
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
