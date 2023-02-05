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
import Alert from '@mui/material/Alert';

import { useModals } from '../../hooks/useModals';
import { useProduct } from '../../hooks/useProduct';

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

function createmyData(id, name, description, price, amount) {
    return { id, name, description, price, amount }
}


export default function ProductWarehouseTable({ productList }) {

    const { handleOpenDeleteModal, handleOpenCreateDeleteProductWarehouseModal } = useModals()
    const { productStatus, updateSelectedProduct } = useProduct()
    const [rows, setRows] = useState([])

    const { isCreated, isDeleted } = productStatus

    const fillRows = () => {
        let tempRows = []
        productList.forEach((item) => {
            let myRow = createmyData(item.id, item.product.name, item.product.description,
                item.product.price, item.product.amount)
            tempRows.push(myRow)
        })
        setRows(tempRows)
    }

    //TODO: Add temporal item
    const handleDeleteProduct = (product) => {
        handleOpenDeleteModal()
        updateSelectedProduct(product)
        // updateTemporalWarehouseList('Del')
    }

    useEffect(() => {
        fillRows()
    }, [productList])

    return (
        <>
            <div className='w-full mt-8 flex flex-row justify-between'>
                <Button
                    variant="contained"
                    endIcon={<WidgetsIcon />}
                    onClick={() => handleOpenCreateDeleteProductWarehouseModal()}
                >
                    <span className='font-bold'>Add product</span>
                </Button>
            </div>

            {
                isCreated
                    ? <Alert className='mt-5' severity="success">Product <span className='font-bold'>added</span> successfully</Alert>
                    : null
            }
            {
                isDeleted
                    ? <Alert className='mt-5' severity="success">Product <span className='font-bold'>deleted</span> successfully</Alert>
                    : null
            }

            <Paper className='paper-container' sx={{
                width: '100%', height: '300px',
                overflowY: 'scroll', marginTop: '20px', scrollBehavior: 'auto',
                overflowX: 'none', scrollbarWidth: 'none'
            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>id</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="left">Description</StyledTableCell>
                                <StyledTableCell align="right">Price ($)</StyledTableCell>
                                <StyledTableCell align="right">Amount</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='bg-table-color'>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id} className='bg-table-color'>
                                    <StyledTableCell >{row.id}</StyledTableCell>
                                    <StyledTableCell >{row.name}</StyledTableCell>
                                    <StyledTableCell >
                                        {row.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                                    <StyledTableCell align="right">{row.amount}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <FontAwesomeIcon
                                            className='text-white text-2xl text-red-500 cursor-pointer' icon={faXmark}
                                            onClick={() => handleDeleteProduct(row)}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    productList.length == 0
                        ? <h1>No products found</h1>
                        : null
                }
            </Paper>
        </>
    );
}