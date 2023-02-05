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
import { useProduct } from '../hooks/useProduct'

const Warehouses = () => {

    const { selectedWarehouse, onDeleteWarehouse, fetchWarehouses, onAddDeleteProductMultipleWarehouse, temporalWarehouseList
    } = useWarehouse()
    const { handleOpenCreateDeleteProductWarehouseModal, handleCloseDeleteModal } = useModals()
    const [isCreate, setIsCreate] = useState(true)

    const handleCreateDeleteModalChange = (value) => {
        handleOpenCreateDeleteProductWarehouseModal()
        setIsCreate(value)
    }

    const handleCreateAndDelete = () => {
        if (isCreate) {
            onAddDeleteProductMultipleWarehouse('Add')
        }
        else {
            onAddDeleteProductMultipleWarehouse('Del')
        }
    }


    useEffect(() => {
        fetchWarehouses()
    }, [])

    return (
        <SidebarLayout>
            <div className='flex flex-col  h-screen flex-col pl-14 pr-14'>
                <DeleteModal isProduct={false} target={selectedWarehouse} onCancel={() => { handleCloseDeleteModal() }} onDelete={() => { onDeleteWarehouse() }} />
                <CreateWarehouseModal />
                <CreateDeleteProductWarehouseModal isCreate={isCreate} onSubmit={() => handleCreateAndDelete()} />
                <h1 className='font-bold text-3xl text-center'>Warehouses</h1>
                <div className='h-1/2'>
                    <WarehousesTable />
                    <div className='w-80 flex flex-row justify-between mt-5'>
                        <Button disabled={temporalWarehouseList.length > 0 ? false : true} variant="contained" onClick={() => handleCreateDeleteModalChange(true)}>Add product</Button>
                        <Button disabled={temporalWarehouseList.length > 0 ? false : true} variant="contained"
                            color='error' className='ml-3'
                            onClick={() => handleCreateDeleteModalChange(false)}
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