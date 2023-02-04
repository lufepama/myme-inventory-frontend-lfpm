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
import { useProduct } from '../../hooks/useProduct'
import { useModals } from '../../hooks/useModals';

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

function createmyData(id, name, description, price) {
    return { id, name, description, price }
}


export default function CustomizedTables() {

    const { productList } = useProduct()
    const { handleOpenDeleteModal, handleOpenCreateProductModal } = useModals()
    const [rows, setRows] = useState([])

    const fillRows = () => {
        let tempRows = []
        productList.forEach((item) => {
            let myRow = createmyData(item.id, item.name, item.description, item.price)
            tempRows.push(myRow)
        })
        setRows(tempRows)
    }

    //TODO: Add temporal item
    const handleDeleteProduct = (product) => {
        handleOpenDeleteModal()
    }

    const handleCreateProduct = () => {
        handleOpenCreateProductModal()
    }


    useEffect(() => {
        fillRows()
    }, [productList])

    return (
        <>
            <div className='w-full mt-20 flex flex-row justify-between'>
                <div className='w-1/3 h-12'>
                    <FilterInput />
                </div>
                <Button
                    variant="contained"
                    endIcon={<WidgetsIcon />}
                    onClick={() => handleCreateProduct()}
                >
                    <span className='font-bold'>Add product</span>
                </Button>
            </div>
            <TableContainer component={Paper} className='mt-5'>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>id</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Description</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
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
        </>
    );
}