import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { useModals } from '../../hooks/useModals';
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

const DeleteModal = ({ isProduct = false, target, onCancel, onDelete }) => {

    //Destructuring  of neccesary data and methods
    const { openDeleteModal } = useModals()

    return (
        <div>
            <Modal
                keepMounted
                open={openDeleteModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col'>
                        <div className='p-2 flex flex-row items-center '>
                            <FontAwesomeIcon className='text-xl ' icon={faBoxOpen} />
                            <h1 className='text-xl ml-4 font-semibold'>Delete {isProduct ? 'Product' : 'Warehouse'}</h1>
                        </div>
                        <div className='p-2 flex flex-col'>
                            <p className='text-lg'>Are you sure you want to delete <span className='font-bold'>
                                {target?.name}</span> {isProduct ? 'product' : 'warehouse'} with and id of <span className='font-bold'>{target?.id}</span>.
                            </p>
                            <div className='flex flex-row-reverse mt-10'>
                                <Button onClick={() => { onCancel() }} style={{ marginLeft: '7px' }} variant="outlined" color="error" >
                                    Cancel
                                </Button>
                                <Button onClick={() => { onDelete() }} variant="contained" color="primary">
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