import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import FilterInput from '../shared/FilterInput';
import Button from '@mui/material/Button';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useWarehouse } from '../../hooks/useWarehouse'
import { useModals } from '../../hooks/useModals';
import Checkbox from '@mui/material/Checkbox';
import { useLocation } from 'wouter';
import Alert from '@mui/material/Alert';

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

function createmyData(id, name, description, address, country, phoneNumber) {
    return { id, name, description, address, country, phoneNumber }
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function WarehousesTable() {

    const { warehouseList, warehouseStatus, updateSelectedWarehouse } = useWarehouse()
    const [_, navigate] = useLocation()
    const { handleOpenCreateWarehouseModal, handleOpenDeleteModal } = useModals()
    const [rows, setRows] = useState([])
    const { isCreated, isDeleted } = warehouseStatus

    const fillRows = () => {
        let tempRows = []
        warehouseList.forEach((item) => {
            let myRow = createmyData(item.id, item.name, item.description, item.address, item.country, item.phoneNumber)
            tempRows.push(myRow)
        })
        setRows(tempRows)
    }

    //TODO: Add temporal item
    const handleDeleteWarehouse = (warehouse) => {
        updateSelectedWarehouse(warehouse)
        handleOpenDeleteModal()
    }

    const handleCreateWarehouse = () => {
        handleOpenCreateWarehouseModal()
    }

    const handleRedirect = (warehouse) => {
        updateSelectedWarehouse(warehouse)
        navigate('/warehouses/2/')
    }

    useEffect(() => {
        fillRows()
    }, [warehouseList])

    return (
        <>
            <div className='w-full mt-20 flex flex-row justify-between'>
                <div className='w-1/3 h-12'>
                    <FilterInput placeholder={'Search warehouse...'} />
                </div>
                <Button
                    variant="contained"
                    endIcon={<WidgetsIcon />}
                    onClick={() => handleCreateWarehouse()}
                >
                    <span className='font-bold'>Add warehouse</span>
                </Button>
            </div>
            {
                isCreated
                    ? <Alert className='mt-5' severity="success">Warehouse <span className='font-bold'>added</span> successfully</Alert>
                    : null
            }
            {
                isDeleted
                    ? <Alert className='mt-5' severity="success">Warehouse <span className='font-bold'>deleted</span> successfully</Alert>
                    : null
            }
            <Paper sx={{
                width: '100%', height: '100%',
                overflowY: 'scroll', marginTop: '20px', scrollBehavior: 'auto',
                overflowX: 'none'
            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>id</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="left">Description</StyledTableCell>
                                <StyledTableCell align="left">Address</StyledTableCell>
                                <StyledTableCell align="center">Country</StyledTableCell>
                                <StyledTableCell align="right">Phone</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='bg-table-color'>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id} className='bg-table-color'>
                                    <StyledTableCell className='cursor-pointer' align="left">
                                        <Checkbox  {...label} />
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
                                            className='text-white text-2xl text-red-500 cursor-pointer' icon={faXmark}
                                            onClick={() => handleDeleteWarehouse(row)}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}