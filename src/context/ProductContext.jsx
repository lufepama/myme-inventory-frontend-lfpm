import { useState, createContext, useEffect } from 'react'


const Context = createContext({})

//Variables definition related to authentication
export const ProductProvider = ({ children }) => {

    const [productList, setProductList] = useState([])
    const [productStatus, setProductStatus] = useState({
        isCreated: false,
        isDeleted: false
    })
    const [selectedProduct, setSelectedProduct] = useState({})

    return (
        <Context.Provider value={{
            productList, setProductList,
            productStatus, setProductStatus,
            selectedProduct, setSelectedProduct
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context