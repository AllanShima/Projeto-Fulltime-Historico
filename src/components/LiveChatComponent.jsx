import React, { useEffect, useState } from 'react'
// import { contacts } from '../assets/data/TempData' 
import ContactItem from './ui/ContactItem';
import Message from './Message';
import { useUserContext } from '../contexts/user-context';
import { db } from '../firebase';
import { addDoc, getDocs, query, collection, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import MessageComponent from './MessageComponent';
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

    const [selectedContact, setSelectedContact] = useState({});
    const [newContacts, setNewContacts] = useState([{}]);

    // Atualizar Lista de contatos(usuários)
    const searchContacts = async() => {
        try {
        // const userCollection = (userState.first + userState.last).toLowerCase();
        const chatCollectionRef = collection(db, "users");
        
        // 2. Pegando o resultado a partir da query
        const q = query(chatCollectionRef);

        // 3. Pegando o resultado a partir da query
        const collectionSnapshot = await getDocs(q);

        if (!collectionSnapshot.empty) {
            // Pega o primeiro documento do array de resultados (como o UID é único, é o que queremos)

            // 1. MAPEIA os DocumentSnapshots para um array de objetos JavaScript.
            //    Aqui chamamos .data() em CADA doc.
            const allContactsData = collectionSnapshot.docs.map(doc => ({
                id: doc.id, // Inclui o ID do documento, se necessário
                ...doc.data() // Pega os campos do documento
            }));

            const filteredContacts = allContactsData.filter(contact => {
                // Note: Assumindo que o campo com o tipo de contato é 'usertype'
                return monitoring 
                    ? contact.usertype === "f/safe" 
                    : contact.usertype === "f/center";
            });
            return filteredContacts;
        } else {
            // O documento não existe.
            console.log("Nenhum usuário encontrado!");
            return null;
        }
            } catch (e) {
                console.log("Erro Ocorrido (Possivelmente contato inexistente): " + e);
            } 
    };

    // Atualizar a lista de contatos
    useEffect(() => {
        // Chamada de função assincrona
        searchContacts()
            .then(contatos => {
                // Este bloco é executado quando a Promise resolve
                console.log("Contatos Encontrados:", contatos);
                setNewContacts(contatos);
                // Você pode chamar um setState aqui, ex: setNewContacts(contatos);
            })
            .catch(error => {
                // Trata qualquer erro não capturado pelo seu try/catch interno
                console.error("Erro na procura de Contatos:", error);
            });
    }, [])



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
                    {newContacts.map((contact, index) => (
                        <button key={index} onClick={() => setSelectedContact(contact)} className={`relative w-full h-fit bg-amber-500`}>
                            <ContactItem contact={contact} selectedContact={selectedContact}/>
                        </button>
                    ))}
                </div>
            </div>
            <div className='w-2/3 p-3 h-full bg-white'>
                {Object.keys(selectedContact).length !== 0 ? (
                    <div className='w-full h-full'>
                        <MessageComponent selectedContact={selectedContact}/>
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
