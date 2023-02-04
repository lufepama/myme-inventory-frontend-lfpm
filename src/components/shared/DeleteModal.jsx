import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { useDeleteModal } from '../../hooks/useDeleteModal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 250,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const DeleteModal = () => {

    const { handleCloseDeleteModal, open } = useDeleteModal()


    return (
        <div>
            <Modal
                keepMounted
                open={open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col'>
                        <div className='p-2 flex flex-row items-center '>
                            <FontAwesomeIcon className='text-xl ' icon={faBoxOpen} />
                            <h1 className='text-xl ml-4 font-semibold'>Delete product</h1>
                        </div>
                        <div className='p-2 flex flex-col'>
                            <p className='text-lg'>Are you sure you want to delete :nameitem with and id of :id</p>
                            <div className='flex flex-row-reverse mt-10'>
                                <Button onClick={() => { handleCloseDeleteModal() }} style={{ marginLeft: '7px' }} variant="contained" color="primary">
                                    Cancel
                                </Button>
                                <Button variant="outlined" color="error">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default DeleteModal