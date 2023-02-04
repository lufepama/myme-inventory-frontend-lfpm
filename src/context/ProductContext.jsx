import { useState, createContext, useEffect } from 'react'


const Context = createContext({})

//Variables definition related to authentication
export const ProductProvider = ({ children }) => {

    const [productList, setProductList] = useState([])


    return (
        <Context.Provider value={{
            productList, setProductList
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context