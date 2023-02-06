import { useState, createContext, useEffect } from 'react'


const Context = createContext({})

//Variables definition related to authentication
export const ModalsProvider = ({ children }) => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
    const [openCreateWarehouseModal, setOpenCreateWarehouseModal] = useState(false);
    const [openCreateDeleteProductWarehouseModal, setOpenCreateDeleteProductWarehouseModal] = useState(false);
    const [openUpdateProductAmountModal, setOpenUpdateProductAmountModal] = useState(false);

    return (
        <Context.Provider value={{
            openDeleteModal, setOpenDeleteModal,
            openCreateProductModal, setOpenCreateProductModal,
            openCreateWarehouseModal, setOpenCreateWarehouseModal,
            openCreateDeleteProductWarehouseModal, setOpenCreateDeleteProductWarehouseModal,
            openUpdateProductAmountModal, setOpenUpdateProductAmountModal
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context