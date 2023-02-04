import React, { useEffect, useContext } from 'react'
import DeleteModalContext from '../context/DeleteModalContext'

export const useDeleteModal = () => {

    const { open, setOpen } = useContext(DeleteModalContext)

    const handleOpenDeleteModal = () => setOpen(true);
    const handleCloseDeleteModal = () => setOpen(false);

    return {
        open,
        handleOpenDeleteModal,
        handleCloseDeleteModal
    }
}