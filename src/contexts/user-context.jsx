import React, { createContext, useContext, useState } from 'react'

// O arquivo do useContext é criado para não ter que renderizar todos os componentes
// sem necessidade dentro do provider, apenas os que o utilizam

// This value is used by components when they try to access the context, but no corresponding <Context.Provider> is found in the component tree above them.
export const UserContext = createContext(null);

export default UserStateProvider = ({ children }) => {
    const [count, setCount] = useState();

    return (
        <UserContext value={{count, setCount}}>
            {children}
        </UserContext>
    )
}

// simplificar o uso de useContext(UserContext) nos componentes

export const useUserContext = useContext(UserContext);