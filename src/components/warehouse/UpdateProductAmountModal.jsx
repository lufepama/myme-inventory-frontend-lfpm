import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { useModals } from '../../hooks/useModals';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const UpdateProductAmountModal = ({ target, onCancel, onUpdate }) => {

    //Destructuring  of neccesary data and methods
    const { openUpdateProductAmountModal } = useModals()
    const [newAmount, setNewAmount] = useState(0)
    const [isError, setIsError] = useState(false)

    //Methods
    const handleChange = (e) => {
        setNewAmount(e.target.value)
    };

    const handleCancel = () => {
        setNewAmount(0)
        setIsError(false)
        onCancel()
    }

    const handleUpdate = () => {
        if (newAmount > 0) {
            onUpdate(newAmount)
            setIsError(false)
        } else setIsError(true)
    }

    return (
        <div>
            <Modal
                keepMounted
                open={openUpdateProductAmountModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col'>
                        <div className='p-2 flex flex-row items-center '>
                            <FontAwesomeIcon className='text-xl ' icon={faBoxOpen} />
                            <h1 className='text-xl ml-4 font-semibold'>Update product amount</h1>
                        </div>
                        <div className='p-2 flex flex-col'>
                            <h1>You will update the amount of product named as <span className='font-bold'>{target.name} </span>
                                with id of <span className='font-bold'>{target.id}</span>.
                            </h1>
                        </div>
                        <div className='flex flex-row'>
                            <label className='self-center mr-3'>Amount: </label>
                            <TextField
                                placeholder='Price'
                                name='name'
                                type='number'
                                value={newAmount}
                                size='small'
                                onChange={handleChange}
                                className='bg-gray-200 rounded-md w-full '
                            />
                        </div>
                        {
                            isError
                                ? <Alert severity="error">Amount must be positive</Alert>
                                : null
                        }
                        <div className='flex flex-row-reverse mt-10'>
                            <Button onClick={() => { handleCancel() }} style={{ marginLeft: '7px' }} variant="outlined" color="error" >
                                Cancel
                            </Button>
                            <Button onClick={() => { handleUpdate() }} variant="contained" color="primary">
                                Update
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default UpdateProductAmountModal