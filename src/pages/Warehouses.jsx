import React, { useEffect } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import WarehousesTable from '../components/warehouse/WarehousesTable'
import { useWarehouse } from '../hooks/useWarehouse'
import DeleteModal from '../components/shared/DeleteModal'
import CreateWarehouseModal from '../components/warehouse/CreateWarehouseModal'

const Warehouses = () => {

    const { fetchWarehouses } = useWarehouse()

    useEffect(() => {
        fetchWarehouses()
    }, [])

    return (
        <SidebarLayout>
            <div className='flex h-screen flex-col pl-14 pr-14'>
                <DeleteModal />
                <CreateWarehouseModal />
                <h1 className='font-bold text-3xl text-center'>Warehouses</h1>
                <div className='h-1/2'>
                    <WarehousesTable />
                </div>
            </div>
        </SidebarLayout>
    )
}

export default Warehouses