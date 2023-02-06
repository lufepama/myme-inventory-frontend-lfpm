import React, { useEffect, useContext } from 'react'
import DeleteModalContext from '../context/ModalsContext'

//"This hook controls the opening and closing of modals utilized in the project

export const useModals = () => {

    //Destructuring states and setstates func from context
    const { openDeleteModal, setOpenDeleteModal,
        openCreateProductModal, setOpenCreateProductModal,
        openCreateWarehouseModal, setOpenCreateWarehouseModal,
        openCreateDeleteProductWarehouseModal, setOpenCreateDeleteProductWarehouseModal,
        openUpdateProductAmountModal, setOpenUpdateProductAmountModal
    }
        = useContext(DeleteModalContext)

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleOpenCreateProductModal = () => setOpenCreateProductModal(true)
    const handleCloseCreateProductModal = () => setOpenCreateProductModal(false)

    const handleOpenCreateWarehouseModal = () => setOpenCreateWarehouseModal(true)
    const handleCloseCreateWarehouseModal = () => setOpenCreateWarehouseModal(false)

    const handleOpenCreateDeleteProductWarehouseModal = () => setOpenCreateDeleteProductWarehouseModal(true)
    const handleCloseCreateDeleteProductWarehouseModal = () => setOpenCreateDeleteProductWarehouseModal(false)

    const handleOpenUpdateProductAmountModal = () => setOpenUpdateProductAmountModal(true)
    const handleCloseUpdateProductAmountModal = () => setOpenUpdateProductAmountModal(false)

    return {
        openDeleteModal,
        openCreateProductModal,
        openCreateWarehouseModal,
        openCreateDeleteProductWarehouseModal,
        openUpdateProductAmountModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleOpenCreateProductModal,
        handleCloseCreateProductModal,
        handleOpenCreateWarehouseModal,
        handleCloseCreateWarehouseModal,
        handleOpenCreateDeleteProductWarehouseModal,
        handleCloseCreateDeleteProductWarehouseModal,
        handleOpenUpdateProductAmountModal,
        handleCloseUpdateProductAmountModal
    }
}