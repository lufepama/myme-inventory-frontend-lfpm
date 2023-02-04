import { useState, createContext, useEffect } from 'react'


const Context = createContext({})

//Variables definition related to authentication
export const WarehouseProvider = ({ children }) => {

    const [warehouseList, setWarehouseList] = useState([])


    return (
        <Context.Provider value={{
            warehouseList, setWarehouseList
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context