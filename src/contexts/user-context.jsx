import React, { createContext, useContext, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase'

// O arquivo do useContext é criado para não ter que renderizar todos os componentes
// sem necessidade dentro do provider, apenas os que o utilizam

// This value is used by components when they try to access the context, but no corresponding <Context.Provider> is found in the component tree above them.
export const UserContext = createContext();
let userObject;
const userContext = (state, action) => {
  switch(action.type){                 
    case "LOGIN":
        userObject = {...state, isLoggedIn: true, uid:action.payload.uid, first:action.payload.first, last:action.payload.last, usertype: action.payload.usertype, alertOn:action.payload.alertOn}
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
        userObject = {...state, alertOn:action.payload.alertOn}
        console.log("Alerta acionado e setado: " + userObject.alertOn)
        return userObject;
    case "RESET_ALERT":
        console.log("Alerta desativado: " + userObject.alertOn)
        userObject = {...state, alertOn:null}
        return userObject;
    case "LOGOUT":
        console.log("Usuário atual desconectado.");
        userObject = {...state, isLoggedIn: false, uid:null, first:null, last:null, usertype:null}
        return userObject;
    default:
        console.log("Returning state for unknown reason");
        return state;
  }
} 

export const UserStateProvider = ({ children }) => {
    // Procurar no firestore e inserir no valor padrão
    const [userState, userDispatch] = useReducer(userContext, { isLoggedIn:false, uid:null, first:null, last:null, usertype:null, alertOn:null })
    return (
        <UserContext value={{userState, userDispatch}}>
            {children}
        </UserContext>
    )
}

// simplificar o uso de useContext(UserContext) ao usar nos componentes
export const useUserContext = () => useContext(UserContext);