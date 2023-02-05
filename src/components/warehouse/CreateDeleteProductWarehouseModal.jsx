import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import { useModals } from '../../hooks/useModals';
import Button from '@mui/material/Button';
import FilterInput from '../shared/FilterInput';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useProduct } from '../../hooks/useProduct'
import AutocompleteInput from '../../components/shared/AutocompleteInput'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const CreateDeleteProductWarehouseModal = ({ isCreate = false, onSubmit }) => {

    const { openCreateDeleteProductWarehouseModal, handleCloseCreateDeleteProductWarehouseModal } = useModals()
    const { productList, updateSelectedProduct } = useProduct()
    const [productData, setProductData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        amount: 0
    })

    const { id, name, description, price, amount } = productData

    const handleChange = (name) =>
        (event) => {
            setProductData({ ...productData, [name]: event.target.value })

        };


    const handleSeletedProductInput = (product) => {
        const prodData = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            amount: amount
        }
        updateSelectedProduct(prodData)
        setProductData(prodData)
    }

    return (
        <div>
            <Modal
                keepMounted
                open={openCreateDeleteProductWarehouseModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col'>
                        <div className='p-2 flex flex-row items-center '>
                            <FontAwesomeIcon className='text-xl ' icon={faWarehouse} />
                            <h1 className='text-xl ml-4 font-semibold'>Create warehouse</h1>
                        </div>
                        <div className='w-52 h-12'>
                            <AutocompleteInput productList={productList}
                                handleSeletedProductInput={handleSeletedProductInput} />
                        </div>
                        <div className='p-2 flex flex-col '>
                            <div className='w-full create-prod-ware-container'>
                                <div className='rounded-xl mt-2 w-3/2 '>
                                    <h1 className='font-bold mb-5 text-lg'>Product detail</h1>
                                    <div className='flex flex-row'>
                                        <label className='self-center mr-3'>id: </label>
                                        <TextField
                                            placeholder='Id'
                                            disabled={true}
                                            name='name'
                                            value={id}
                                            size='small'
                                            onChange={handleChange('name')}
                                            className='bg-gray-200 rounded-md w-full '
                                        />
                                    </div>
                                    <div className='flex flex-row'>
                                        <label className='self-center mr-3'>Name: </label>
                                        <TextField
                                            placeholder='Name'
                                            name='name'
                                            disabled={true}
                                            value={name}
                                            size='small'
                                            onChange={handleChange('name')}
                                            className='bg-gray-200 rounded-md w-full '
                                        />
                                    </div>
                                    <div className='flex flex-row'>
                                        <label className='self-center mr-3'>Description: </label>
                                        <TextField
                                            placeholder='Description'
                                            name='name'
                                            disabled={true}
                                            value={description}
                                            size='small'
                                            onChange={handleChange('name')}
                                            className='bg-gray-200 rounded-md w-full '
                                        />
                                    </div>
                                    <div className='flex flex-row'>
                                        <label className='self-center mr-3'>Price: </label>
                                        <TextField
                                            placeholder='Price'
                                            name='name'
                                            disabled={true}
                                            value={price}
                                            size='small'
                                            onChange={handleChange('price')}
                                            className='bg-gray-200 rounded-md w-full '
                                        />
                                    </div>
                                    <div className='flex flex-row'>
                                        <label className='self-center mr-3'>Amount: </label>
                                        <TextField
                                            placeholder='Price'
                                            name='name'
                                            type='number'
                                            value={amount}
                                            size='small'
                                            onChange={handleChange('amount')}
                                            className='bg-gray-200 rounded-md w-full '
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row-reverse mt-10'>
                                <Button onClick={() => {
                                    handleCloseCreateDeleteProductWarehouseModal()
                                }} variant="outlined" color="error">
                                    Cancel
                                </Button>
                                <Button onClick={() => { onSubmit(amount) }} style={{ marginRight: '7px' }} variant="contained" color="primary">
                                    {
                                        isCreate ? 'Create' : 'Delete'
                                    }
                                </Button>

                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateDeleteProductWarehouseModal
