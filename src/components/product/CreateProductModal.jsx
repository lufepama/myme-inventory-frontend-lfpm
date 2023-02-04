import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import { useModals } from '../../hooks/useModals';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 350,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const CreateProductModal = () => {

    const { openCreateProductModal, handleCloseCreateProductModal } = useModals()
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: null
    })
    const { name, description, price } = productData

    const handleChange = (name) =>
        (event) => {
            productData({ ...productData, [name]: event.target.value })
        };


    const handleProductCreate = () => {

    }


    return (
        <div>
            <Modal
                keepMounted
                open={openCreateProductModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col'>
                        <div className='p-2 flex flex-row items-center '>
                            <FontAwesomeIcon className='text-xl ' icon={faBoxOpen} />
                            <h1 className='text-xl ml-4 font-semibold'>Create product</h1>
                        </div>
                        <div className='p-2 flex flex-col'>
                            <div className='w-full'>
                                <div className='rounded-xl mt-2 w-3/2'>
                                    <TextField
                                        placeholder='Name'
                                        name='name'
                                        value={name}
                                        onChange={handleChange('name')}
                                        className='bg-gray-200 rounded-md w-full'
                                    />
                                    <TextField
                                        placeholder='Description'
                                        hidden={true}
                                        name={description}
                                        onChange={handleChange('description')}
                                        className='bg-gray-200 rounded-md mt-3 w-full'
                                    />
                                    <input
                                        type="number" required placeholder='Price ($)'
                                        name="price" min="0" value={price} step=".01"
                                        className='bg-gray-200 mt-3 h-12 rounded-lg'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row-reverse mt-10'>
                                <Button onClick={() => { handleCloseCreateProductModal() }} style={{ marginLeft: '7px' }} variant="contained" color="primary">
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

export default CreateProductModal