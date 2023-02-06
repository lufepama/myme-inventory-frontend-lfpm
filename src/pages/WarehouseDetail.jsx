import React, { useEffect, useState } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import { useWarehouse } from '../hooks/useWarehouse'
import DeleteModal from '../components/shared/DeleteModal'
import { useProduct } from '../hooks/useProduct'
import { useModals } from '../hooks/useModals'
import ProductWarehouseTable from '../components/warehouse/ProductWarehouseTable'
import CreateDeleteProductWarehouseModal from '../components/warehouse/CreateDeleteProductWarehouseModal'
import UpdateProductAmountModal from '../components/warehouse/UpdateProductAmountModal'

const WarehouseDetail = ({ params }) => {

    const { fetchProductsWarehouse, onAddDeleteProductWarehouse, selectedWarehouse,
        productsWarehouseList, updateProductAmount
    } = useWarehouse()
    const { handleCloseDeleteModal, handleCloseCreateDeleteProductWarehouseModal,
        handleCloseUpdateProductAmountModal
    } = useModals()
    const { selectedProduct, updateSelectedProduct } = useProduct()

    const handleCreateProductWarehouse = (amount) => {
        onAddDeleteProductWarehouse('Add', amount)
        handleCloseCreateDeleteProductWarehouseModal()
    }

    const handleUpdateProductAmount = (amount) => {
        updateProductAmount(amount)
        handleCloseUpdateProductAmountModal()
    }

    useEffect(() => {
        fetchProductsWarehouse(params.id)
    }, [])

    return (
        <SidebarLayout>
            <div className='flex flex-col pl-14 pr-14'>
                <DeleteModal isProduct={selectedProduct} target={selectedProduct} onCancel={() => handleCloseDeleteModal()} onDelete={() => { onAddDeleteProductWarehouse('Del') }} />
                <CreateDeleteProductWarehouseModal isCreate={true} onSubmit={handleCreateProductWarehouse} />
                <UpdateProductAmountModal
                    onCancel={() => { handleCloseUpdateProductAmountModal() }}
                    onUpdate={handleUpdateProductAmount}
                    target={selectedProduct}
                />
                <h1 className='font-bold text-3xl text-center'>Warehouse detail</h1>
                <h1 className='-mb-5 mt-5 p-3 text-2xl font-semibold'>Warehouse info:</h1>
                <div className='flex flex-row'>
                    <div className='flex flex-row'>
                        <div className='p-5'>
                            <span className='mr-3 text-xl font-bold'>Name: </span>
                            <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.name}</span>
                        </div>
                        <div className='p-5'>
                            <span className='mr-3 text-xl font-bold'>Country: </span>
                            <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.country}</span>
                        </div>
                    </div>
                    <div className='flex flex-row ml-10'>
                        <div className='p-5'>
                            <span className='mr-3 text-xl font-bold'>Address: </span>
                            <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.address}</span>
                        </div>
                        <div className='p-5'>
                            <span className='mr-3 text-xl font-bold'>Phone: </span>
                            <span className='mr-3 text-xl font-semibold'>{selectedWarehouse?.phoneNumber}</span>
                        </div>
                    </div>
                </div>
                <ProductWarehouseTable productList={productsWarehouseList} />
            </div>
        </SidebarLayout>
    )
}

export default WarehouseDetail