import { useState, createContext, useEffect } from 'react'


const Context = createContext({})

//Variables definition related to authentication
export const DeleteModalProvider = ({ children }) => {

    const [open, setOpen] = useState(false);

    return (
        <Context.Provider value={{
            open, setOpen
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context