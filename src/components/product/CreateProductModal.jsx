import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import { useModals } from '../../hooks/useModals';
import { useProduct } from '../../hooks/useProduct';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const CreateProductModal = () => {

    const { openCreateProductModal, handleCloseCreateProductModal } = useModals()
    const { onAddProduct } = useProduct()
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0
    })
    const [isError, setIsError] = useState(false)
    const { name, description, price } = productData

    const handleChange = (name) =>
        (event) => {
            setProductData({ ...productData, [name]: event.target.value })
        };

    const handleProductCreate = () => {
        if (name != '') {
            onAddProduct(productData)
            setIsError(false)
            setProductData({ name: '', description: '', price: 0 })
        } else {
            setIsError(true)
        }
    }

    const handleCancel = () => {
        setIsError(false)
        handleCloseCreateProductModal()
        setProductData({ name: '', description: '', price: 0 })
    }


    return (
        <>
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
                                        onChange={handleChange('price')}
                                        className='bg-gray-200 mt-3 h-12 rounded-lg'
                                    />
                                </div>
                                {
                                    isError
                                        ? <Alert severity="error">Name field is required</Alert>
                                        : null
                                }
                            </div>
                            <div className='flex flex-row-reverse mt-10'>
                                <Button style={{ marginLeft: '7px' }} onClick={() => { handleCancel() }} variant="outlined" color="error">
                                    Cancel
                                </Button>
                                <Button onClick={() => handleProductCreate()} variant="contained" color="primary">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default CreateProductModal