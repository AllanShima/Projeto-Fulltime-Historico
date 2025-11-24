import React, { useEffect, useState } from 'react'
import EventCardUser from './ui/EventCardUser'
import { useUserContext } from '../contexts/user-context'
import { firestoreGetEvents } from '../services/api/FirebaseGetFunctions'
import { db } from '../services/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const UserNotificationComponent = ({setNotificationButtonModal, setPdfButtonModal, setCurrentEvent}) => {
    const { userState, userDispatch } = useUserContext();
    const [userEvents, setUserEvents] = useState();
    const userId = userState?.uid;

    useEffect(() => {
        // Verifica se o UID está pronto para evitar erros de leitura
        if (!userId) {
            console.warn("UID do usuário não disponível para iniciar o listener.");
            return; 
        }

        const userEventCollectionRef = collection(db, "users", userId, "notifications");

        // 1. Defina a Query (ex: ordenar por data)
        const q = query(userEventCollectionRef, orderBy("date", "desc"));

        // 2. INICIA O OUVINTE em tempo real
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("Ouvinte de notificações do f/safe em andamento! Dados atualizados sendo recebidos.");

            // 3. MAPEIA os novos dados contidos no SNAPSHOT do ouvinte.
            const newEvents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setUserEvents(newEvents);
        }, (error) => {
            // Trata erros que possam ocorrer com a conexão (permissão, rede)
            console.error("Erro no listener do Firestore:", error);
            // Opcional: setUserEvents([]) em caso de erro grave.
        });

        // 5. CLEANUP CRUCIAL: Retorna a função de unsubscribe.
        // O React chama esta função quando o componente for desmontado,
        // garantindo que a conexão seja fechada.
        return () => {
            console.log("Listener de eventos cancelado (unsubscribe).");
            unsubscribe();
        };

        // Roda novamente se o userId mudar
    }, [userId]);


    return (
        <div className='flex flex-col pl-4 pt-4 max-h-135 w-full'>
            <span className='justify-center text-primary'>
                <h1>Lista de Notificações ({userEvents?.length || 0})</h1>
            </span>   
            <div className='flex-1 w-full mt-4 justify-between overflow-y-auto'>
                <div className='w-full pr-4 space-y-3'>
                    {userEvents?.map((event) => (
                    <EventCardUser 
                        key={event.id} 
                        event={event} 
                        setNotificationButtonModal={setNotificationButtonModal}
                        setPdfButtonModal={setPdfButtonModal}
                        setCurrentEvent={setCurrentEvent}
                    />
                    ))}          
                </div>           
            </div>
        </div>
    )
}

export default UserNotificationComponent
