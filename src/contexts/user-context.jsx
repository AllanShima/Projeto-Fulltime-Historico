import React, { createContext, useContext, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'

// O arquivo do useContext é criado para não ter que renderizar todos os componentes
// sem necessidade dentro do provider, apenas os que o utilizam

// This value is used by components when they try to access the context, but no corresponding <Context.Provider> is found in the component tree above them.
export const UserContext = createContext();

const userContext = (state, action) => {
  switch(action.type){                 
    case "LOGIN":
        const userObject = {...state, isLoggedIn: true, uid:action.payload.uid, first:action.payload.first, last:action.payload.last, usertype: action.payload.usertype}
        const fullname = userObject.first + ' ' + userObject.last;
        console.log("Usuário logado: " + fullname);
        return userObject;
    case "LOGOUT":
        console.log("Usuário atual desconectado.");
        return {...state, isLoggedIn: false, uid:null, first:null, last:null, usertype:null }
    default:
        console.log("Returning state for unknown reason");
        return state;
  }
} 

export const UserStateProvider = ({ children }) => {
    // Procurar no firestore e inserir no valor padrão
    const [userState, userDispatch] = useReducer(userContext, { isLoggedIn:false, uid:null, first:null, last:null, usertype:null })
    return (
        <UserContext value={{userState, userDispatch}}>
            {children}
        </UserContext>
    )
}

// simplificar o uso de useContext(UserContext) ao usar nos componentes
export const useUserContext = () => useContext(UserContext);