import React, { useEffect, useState } from 'react'
// import { contacts } from '../assets/data/TempData' 
import ContactItem from './ui/ContactItem';
import MessageComponent from './MessageComponent';
import { firestoreGetContacts } from '../services/api/FirebaseGetFunctions';
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

const LiveChatComponent = ({ monitoring=true, setSelectedUserContact, setButtonClick }) => {

    const [selectedContact, setSelectedContact] = useState({});
    const [newContacts, setNewContacts] = useState([{}]);

    const setSelected = (contact) => {
        // 🚀 CORREÇÃO DE SEGURANÇA: Verifica se a prop é uma função antes de chamar
        if (typeof setSelectedUserContact === 'function') {
            setSelectedUserContact(contact); 
        } else {
            console.warn("A prop setSelectedUserContact não é uma função e foi ignorada.");
        }
        setSelectedContact(contact)
        setButtonClick(false);
     }

    // Atualizar a lista de contatos
    useEffect(() => {
        // Chamada de função assincrona
        // 1. Usar uma função interna async para melhor legibilidade
        const fetchData = async () => {
            try {
                // 2. Chamar a função com o argumento necessário (Correção #1)
                const contatos = await firestoreGetContacts(monitoring); 
                
                if (contatos) {
                    setNewContacts(contatos);
                } else {
                    console.log("Lista de contatos vazia.");
                    setNewContacts([]); // Boa prática: definir para um array vazio em vez de null
                }
            } catch (error) {
                console.error("Erro na procura de Contatos:", error);
                setNewContacts([]); // Limpa a lista em caso de erro
            }
        };

        fetchData();
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
                        <button key={index} onClick={() => setSelected(contact)} className={`relative w-full h-fit`}>
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
