import { useState, createContext, useEffect } from 'react'


const Context = createContext({})

//Variables definition related to authentication
export const WarehouseProvider = ({ children }) => {

    const [warehouseList, setWarehouseList] = useState([])
    const [productsWarehouseList, setProductsWarehouseList] = useState([])
    const [selectedWarehouse, setSelectedWarehouse] = useState({})
    const [warehouseStatus, setWarehouseStatus] = useState({
        isCreated: false,
        isDeleted: false
    })

    return (
        <Context.Provider value={{
            warehouseList, setWarehouseList,
            productsWarehouseList, setProductsWarehouseList,
            selectedWarehouse, setSelectedWarehouse,
            warehouseStatus, setWarehouseStatus
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context