import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useWarehouse } from '../../hooks/useWarehouse'
import { useModals } from '../../hooks/useModals';
import Alert from '@mui/material/Alert';
import WarehouseCell from './WarehouseCell';

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


export default function WarehousesTable() {

    //Destructuring  of neccesary data and methods
    const { warehouseList, warehouseStatus } = useWarehouse()
    const { handleOpenCreateWarehouseModal, } = useModals()
    const [rows, setRows] = useState([])
    const { isCreated, isDeleted } = warehouseStatus

    //Methods

    //Fills rows of table according to warehouse list items.
    const fillRows = () => {
        let tempRows = []
        warehouseList.forEach((item) => {
            let myRow = createmyData(item.id, item.name, item.description, item.address, item.country, item.phoneNumber)
            tempRows.push(myRow)
        })
        setRows(tempRows)
    }

    const handleCreateWarehouse = () => {
        handleOpenCreateWarehouseModal()
    }

    useEffect(() => {
        fillRows()
    }, [warehouseList])

    return (
        <>
            <div className='w-full mt-20 flex flex-row justify-between'>

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
            <Paper className='paper-container' sx={{
                width: '100%', height: '300px',
                overflowY: 'scroll', marginTop: '20px', scrollBehavior: 'auto',
                overflowX: 'none',
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
                                <WarehouseCell key={row.id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                    {
                        warehouseList.length == 0
                            ? <h1>No warehouses found.</h1>
                            : null
                    }
                </TableContainer>
            </Paper>
        </>
    );
}