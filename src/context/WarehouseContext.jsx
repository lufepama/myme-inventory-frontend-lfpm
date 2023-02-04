import { useState, createContext, useEffect } from 'react'


const Context = createContext({})

//Variables definition related to authentication
export const WarehouseProvider = ({ children }) => {

    const [warehouseList, setWarehouseList] = useState([])
    const [productsWarehouseList, setProductsWarehouseList] = useState([])
    const [selectedWarehouse, setSelectedWarehouse] = useState({})

    return (
        <Context.Provider value={{
            warehouseList, setWarehouseList,
            productsWarehouseList, setProductsWarehouseList,
            selectedWarehouse, setSelectedWarehouse
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context