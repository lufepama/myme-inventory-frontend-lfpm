import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import { useModals } from '../../hooks/useModals';
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
    const [warehouseData, setWarehouseData] = useState({
        name: '',
        description: '',
        address: '',
        country: '',
        phone: null
    })
    const { name, description, address, country, phone } = warehouseData

    const handleChange = (name) =>
        (event) => {
            setWarehouseData({ ...warehouseData, [name]: event.target.value })
        };


    const handleProductCreate = () => {

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
                                        name={phone}
                                        onChange={handleChange('phone')}
                                        className='bg-gray-200 rounded-md mt-3 w-full'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row-reverse mt-10'>
                                <Button onClick={() => { handleCloseCreateWarehouseModal() }} style={{ marginLeft: '7px' }} variant="contained" color="primary">
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

export default CreateWarehouseModal