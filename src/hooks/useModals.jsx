import React, { useEffect, useContext } from 'react'
import DeleteModalContext from '../context/ModalsContext'

export const useModals = () => {

    const { openDeleteModal, setOpenDeleteModal,
        openCreateProductModal, setOpenCreateProductModal
    }
        = useContext(DeleteModalContext)

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleOpenCreateProductModal = () => setOpenCreateProductModal(true)
    const handleCloseCreateProductModal = () => setOpenCreateProductModal(false)

    return {
        openDeleteModal,
        openCreateProductModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleOpenCreateProductModal,
        handleCloseCreateProductModal
    }
}