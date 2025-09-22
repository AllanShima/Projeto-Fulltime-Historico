import React, { createContext, useContext, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'

// O arquivo do useContext é criado para não ter que renderizar todos os componentes
// sem necessidade dentro do provider, apenas os que o utilizam

// This value is used by components when they try to access the context, but no corresponding <Context.Provider> is found in the component tree above them.
export const UserContext = createContext();

// const user = "";

const userContext = (state, action) => {
  switch(action.type){                 
    case "LOGIN":
        console.log("Logged in!");
        return {...state, isLoggedIn: true, fullName:action.payload.fullName, usertype: action.payload.usertype}
    case "LOGOUT":
        console.log("Logged Out!");
        return {...state, isLoggedIn: false, user:null, fullName:null, usertype:null }
    default:
        console.log("Returning state for unknown reason");
        return state;
  }
} 

export const UserStateProvider = ({ children }) => {
    // Procurar no firestore e inserir no valor padrão
    const [userState, userDispatch] = useReducer(userContext, { isLoggedIn:false, fullName:null, usertype:null })
    return (
        <UserContext value={{userState, userDispatch}}>
            {children}
        </UserContext>
    )
}

// simplificar o uso de useContext(UserContext) ao usar nos componentes
export const useUserContext = () => useContext(UserContext);