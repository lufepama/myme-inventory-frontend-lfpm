import React, { useEffect } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import { useWarehouse } from '../hooks/useWarehouse'
import ProductsTable from '../components/product/ProductsTable'
import DeleteModal from '../components/shared/DeleteModal'
import CreateProductModal from '../components/product/CreateProductModal'

const WarehouseDetail = ({ params }) => {

    const { fetchProductsWarehouse, selectedWarehouse, productsWarehouseList } = useWarehouse()

    useEffect(() => {
        fetchProductsWarehouse(params.id)
    }, [])

    return (
        <SidebarLayout>
            <div className='flex flex-col pl-14 pr-14'>
                <DeleteModal />
                <CreateProductModal />
                <h1 className='font-bold text-3xl text-center'>Warehouse detail</h1>
                <div className='flex flex-row  mt-5'>
                    <div className='p-5'>
                        <span className='mr-3 text-xl font-bold'>Name: </span>
                        <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.name}</span>
                    </div>
                    <div className='p-5'>
                        <span className='mr-3 text-xl font-bold'>Country: </span>
                        <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.country}</span>
                    </div>
                </div>
                <div className='flex flex-row mt-5'>
                    <div className='p-5'>
                        <span className='mr-3 text-xl font-bold'>Address: </span>
                        <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.address}</span>
                    </div>
                    <div className='p-5'>
                        <span className='mr-3 text-xl font-bold'>Phone: </span>
                        <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.phoneNumber}</span>
                    </div>
                </div>
                <ProductsTable productList={productsWarehouseList} />
            </div>
        </SidebarLayout>
    )
}

export default WarehouseDetail