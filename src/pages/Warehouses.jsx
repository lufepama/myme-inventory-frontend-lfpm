import React, { useEffect, useState } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import WarehousesTable from '../components/warehouse/WarehousesTable'
import { useWarehouse } from '../hooks/useWarehouse'
import DeleteModal from '../components/shared/DeleteModal'
import CreateWarehouseModal from '../components/warehouse/CreateWarehouseModal'
import WidgetsIcon from '@mui/icons-material/Widgets';
import Button from '@mui/material/Button';
import CreateDeleteProductWarehouseModal from '../components/warehouse/CreateDeleteProductWarehouseModal'
import { useModals } from '../hooks/useModals'

const Warehouses = () => {

    const { selectedWarehouse, onDeleteWarehouse, fetchWarehouses, warehouseList } = useWarehouse()
    const { handleOpenCreateDeleteProductWarehouseModal, handleCloseDeleteModal } = useModals()
    const [filteredList, setFilteredList] = useState(warehouseList)
    const [query, setQuery] = useState('')

    // const handleInputChange = (e) => {
    //     setQuery(e.target.value)
    //     const results = warehouseList.filter(product => {
    //         if (e.target.value == "") {
    //             return warehouseList
    //         }
    //         return product?.name.toLowerCase().includes(e.target.value.toLowerCase())
    //     })
    //     setFilteredList(results)
    // }


    useEffect(() => {
        fetchWarehouses()
    }, [])

    return (
        <SidebarLayout>
            <div className='flex flex-col  h-screen flex-col pl-14 pr-14'>
                <DeleteModal isProduct={false} target={selectedWarehouse} onCancel={() => { handleCloseDeleteModal() }} onDelete={() => { onDeleteWarehouse() }} />
                <CreateWarehouseModal />
                <CreateDeleteProductWarehouseModal />
                <h1 className='font-bold text-3xl text-center'>Warehouses</h1>
                <div className='h-1/2'>
                    <WarehousesTable />
                    <div className='w-80 flex flex-row justify-between mt-5'>
                        <Button variant="contained" onClick={() => handleOpenCreateDeleteProductWarehouseModal()}>Add product</Button>
                        <Button variant="contained"
                            color='error' className='ml-3'
                            onClick={() => handleOpenCreateDeleteProductWarehouseModal()}
                        >
                            Delete product
                        </Button>
                    </div>

                </div>
            </div>
        </SidebarLayout>
    )
}

export default Warehouses