import React, { useEffect, useContext } from 'react'
import DeleteModalContext from '../context/ModalsContext'

export const useModals = () => {

    const { openDeleteModal, setOpenDeleteModal,
        openCreateProductModal, setOpenCreateProductModal,
        openCreateWarehouseModal, setOpenCreateWarehouseModal,
    }
        = useContext(DeleteModalContext)

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleOpenCreateProductModal = () => setOpenCreateProductModal(true)
    const handleCloseCreateProductModal = () => setOpenCreateProductModal(false)

    const handleOpenCreateWarehouseModal = () => setOpenCreateWarehouseModal(true)
    const handleCloseCreateWarehouseModal = () => setOpenCreateWarehouseModal(false)

    return {
        openDeleteModal,
        openCreateProductModal,
        openCreateWarehouseModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleOpenCreateProductModal,
        handleCloseCreateProductModal,
        handleOpenCreateWarehouseModal,
        handleCloseCreateWarehouseModal
    }
}