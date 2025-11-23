import React, { createContext, useContext, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase'

// O arquivo do useContext é criado para não ter que renderizar todos os componentes
// sem necessidade dentro do provider, apenas os que o utilizam

// This value is used by components when they try to access the context, but no corresponding <Context.Provider> is found in the component tree above them.
export const UserContext = createContext();
const userContext = (state, action) => {
  switch(action.type){                 
    case "LOGIN":
        const userObject = {
            ...state, 
            isLoggedIn: true, 
            uid: action.payload.uid, 
            first: action.payload.first, 
            last: action.payload.last, 
            usertype: action.payload.usertype, 
            alertOn: action.payload.alertOn, // NÃO APAGAR: IMPORTANTE P USUÁRIO
            location: action.payload.location,
            events: null,
            can_record: action.payload.can_record,
            can_send_email: action.payload.can_send_email,
            email: action.payload.email,
            phone_number: action.payload.phone_number
        }
        const fullname = userObject.first + ' ' + userObject.last;

        console.log("Usuário logado: " + fullname);

        let alertTypeTitle = null; // Renamed to avoid confusion with a function or object

        if (userObject.alertOn && userObject.alertOn.title) { // Check if userObject.alertOn and its title exist
            alertTypeTitle = userObject.alertOn.title;
        }

        if (alertTypeTitle){
            const alertType = userObject.alertOn.title;
            console.log("Estado do alerta: " + alertType);
        } else console.log("Nenhum alerta ativado...");

        return userObject;

    case "SET_ALERT":
        const newStateSetAlert = {...state, alertOn:action.payload.alertOn}
        console.log("Alerta acionado e setado no context: " + newStateSetAlert.alertOn)
        return newStateSetAlert;
        
    case "RESET_ALERT":
        console.log("Alerta desativado: " + state.alertOn.type)
        const newStateResetAlert = {...state, alertOn:null}
        return newStateResetAlert;

    case "SET_LOCATION":
        const newStateSetLocation = {...state, location:action.payload.location}
        console.log("Localização setada no context acionado e setado: " + newStateSetLocation.location)
        return newStateSetLocation;

    case "SET_EVENTS":
        const newStateSetEvents = {...state, events:action.payload.events}
        console.log("Eventos encontrados!" )
        return newStateSetEvents;

    case "RESET_EVENTS":
        console.log("Nenhum evento encontrado...")
        const newStateResetEvents = {...state, events:null}
        return newStateResetEvents;

    case "SET_CAN_RECORD":
        const newStateSetRecord = {...state, can_record:true}
        console.log("Setando 'can_record' para true...");
        return newStateSetRecord;

    case "RESET_CAN_RECORD":
        console.log("Resetando 'can_record' para false...");
        const newStateResetRecord = {...state, can_record:false}
        return newStateResetRecord;

    case "SET_CAN_SEND_EMAIL":
        const newStateSetSendEmail = {...state, can_send_email:true}
        console.log("Setando 'can_send_email' para true...");
        return newStateSetSendEmail;

    case "RESET_CAN_SEND_EMAIL":
        console.log("Resetando 'can_send_email' para false...");
        const newStateResetSendEmail = {...state, can_send_email:false}
        return newStateResetSendEmail;

    case "LOGOUT":
        console.log("Usuário atual desconectado.");
        const userLogout = 
        {
            ...state, 
            isLoggedIn: false, 
            uid: null, 
            first: null, 
            last: null, 
            usertype:null, 
            alertOn: null, 
            location: null,
            events: null,
            can_record: false,
            can_send_email: false,
            email: null,
            phone_number: null
        }
        return userLogout;
    default:
        console.log("Returning state for unknown reason");
        return state;
  }
} 

export const UserStateProvider = ({ children }) => {
    // Procurar no firestore e inserir no valor padrão
    const [userState, userDispatch] = useReducer(userContext, 
        { 
            isLoggedIn:false, 
            uid: null, 
            first: null, 
            last: null, 
            usertype: null, 
            alertOn: null,
            location: null,
            events: null,
            can_record: false,
            can_send_email: false,
            email: null,
            phone_number: null
        })
    return (
        <UserContext value={{userState, userDispatch}}>
            {children}
        </UserContext>
    )
}

// simplificar o uso de useContext(UserContext) ao usar nos componentes
export const useUserContext = () => useContext(UserContext);