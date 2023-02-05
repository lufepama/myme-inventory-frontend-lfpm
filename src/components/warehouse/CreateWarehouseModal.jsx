import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import { useModals } from '../../hooks/useModals';
import { useWarehouse } from '../../hooks/useWarehouse';
import Button from '@mui/material/Button';

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

const CreateWarehouseModal = () => {

    const { openCreateWarehouseModal, handleCloseCreateWarehouseModal } = useModals()
    const { onAddWarehouse } = useWarehouse()
    const [warehouseData, setWarehouseData] = useState({
        name: '',
        description: '',
        address: '',
        country: '',
        phone_number: ''
    })
    const [isError, setIsError] = useState(false)

    const { name, description, address, country, phone_number } = warehouseData

    const handleChange = (name) =>
        (event) => {
            setWarehouseData({ ...warehouseData, [name]: event.target.value })
        };

    const handleCancel = () => {
        handleCloseCreateWarehouseModal()
    }

    const handleWarehouseCreate = () => {
        if (name != '') {
            onAddWarehoucse(warehouseData)
            setIsError(false)
        } else {
            setIsError(true)
        }
    }


    return (
        <div>
            <Modal
                keepMounted
                open={openCreateWarehouseModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col'>
                        <div className='p-2 flex flex-row items-center '>
                            <FontAwesomeIcon className='text-xl ' icon={faWarehouse} />
                            <h1 className='text-xl ml-4 font-semibold'>Create warehouse</h1>
                        </div>
                        <div className='p-2 flex flex-col'>
                            <div className='w-full'>
                                <div className='rounded-xl mt-2 w-3/2'>
                                    <TextField
                                        placeholder='Name'
                                        name='name'
                                        value={name}
                                        onChange={handleChange('name')}
                                        className='bg-gray-200 rounded-md w-full '
                                    />
                                    <TextField
                                        placeholder='Description'
                                        hidden={true}
                                        name={description}
                                        onChange={handleChange('description')}
                                        className='bg-gray-200 rounded-md  w-full'
                                    />
                                    <TextField
                                        placeholder='Address'
                                        name='address'
                                        value={address}
                                        onChange={handleChange('address')}
                                        className='bg-gray-200 rounded-md w-full'
                                    />
                                    <TextField
                                        placeholder='Country'
                                        hidden={true}
                                        name={country}
                                        onChange={handleChange('country')}
                                        className='bg-gray-200 rounded-md mt-3 w-full'
                                    />
                                    <TextField
                                        placeholder='Phone'
                                        type={'number'}
                                        hidden={true}
                                        name={phone_number}
                                        onChange={handleChange('phone_number')}
                                        className='bg-gray-200 rounded-md mt-3 w-full'
                                    />
                                </div>
                            </div>
                            {
                                isError
                                    ? <h1>Name field is required</h1>
                                    : null
                            }
                            <div className='flex flex-row-reverse mt-10'>
                                <Button style={{ marginLeft: '7px' }} onClick={() => { handleCancel() }} variant="outlined" color="error">
                                    Cancel
                                </Button>
                                <Button onClick={() => handleWarehouseCreate()} variant="contained" color="primary">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateWarehouseModal