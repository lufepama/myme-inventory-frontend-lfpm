import React, { useState } from 'react'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TableRow from '@mui/material/TableRow';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useWarehouse } from '../../hooks/useWarehouse';
import { useModals } from '../../hooks/useModals';
import { useLocation } from 'wouter';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#352A35',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 20,
    },
}));


const WarehouseCell = ({ row }) => {

    const [checkbox, setCheckBox] = useState(false)

    const { updateSelectedWarehouse, updateTemporalWarehouseList } = useWarehouse()
    const { handleOpenDeleteModal } = useModals()
    const [_, navigate] = useLocation()

    const handleDeleteWarehouse = (warehouse) => {
        updateSelectedWarehouse(warehouse)
        handleOpenDeleteModal()
    }

    const handleRedirect = (warehouse) => {
        updateSelectedWarehouse(warehouse)
        navigate(`/warehouses/${warehouse.id}/`)
    }

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setCheckBox(e.target.checked);
            updateTemporalWarehouseList(row, 'Add')
        } else {
            setCheckBox(e.target.checked);
            updateTemporalWarehouseList(row, 'Del')
        }
    }

    return (
        <StyledTableRow className='bg-table-color'>
            <StyledTableCell className='cursor-pointer' align="left">
                <Checkbox
                    checked={checkbox}
                    onChange={handleCheckboxChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </StyledTableCell>
            <StyledTableCell className='cursor-pointer' onClick={() => handleRedirect(row)} >{row.id}</StyledTableCell>
            <StyledTableCell className='cursor-pointer' onClick={() => handleRedirect(row)} >{row.name}</StyledTableCell>
            <StyledTableCell className='cursor-pointer' onClick={() => handleRedirect(row)} >
                {row.description}
            </StyledTableCell>
            <StyledTableCell className='cursor-pointer' onClick={() => handleRedirect(row)} align="left">{row.address}</StyledTableCell>
            <StyledTableCell className='cursor-pointer' onClick={() => handleRedirect(row)} align="center">{row.country}</StyledTableCell>
            <StyledTableCell className='cursor-pointer' onClick={() => handleRedirect(row)} align="right">{row.phoneNumber}</StyledTableCell>
            <StyledTableCell align="right">
                <FontAwesomeIcon
                    className='text-white text-lg text-red-500 cursor-pointer' icon={faTrashAlt}
                    onClick={() => handleDeleteWarehouse(row)}
                />
            </StyledTableCell>
        </StyledTableRow>

    )
}

export default WarehouseCell