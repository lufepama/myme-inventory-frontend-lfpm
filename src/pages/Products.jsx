import React, { useEffect, useState } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import ProductsTable from '../components/product/ProductsTable'
import { useProduct } from '../hooks/useProduct'
import DeleteModal from '../components/shared/DeleteModal'
import CreateProductModal from '../components/product/CreateProductModal'
import { useModals } from '../hooks/useModals'

const Products = () => {

    //Destructuring  of neccesary data and methods
    const { productList, selectedProduct, onDeleteProduct, fetchProducts, resetAlertMessages } = useProduct()
    const { handleCloseDeleteModal } = useModals()

    useEffect(() => {
        //Before mount, need to recover products and reset alert messages in case there is any
        resetAlertMessages()
        fetchProducts()
    }, [])

    return (
        <SidebarLayout>
            <div className='flex h-full flex-col flex-col pl-14 pr-14'>
                <DeleteModal isProduct={true} target={selectedProduct} onCancel={() => { handleCloseDeleteModal() }} onDelete={() => { onDeleteProduct() }} />
                <CreateProductModal />
                <h1 className='font-bold text-3xl text-center'>Products</h1>
                <div className='h-1/2'>
                    <ProductsTable productList={productList} />
                </div>
            </div>
        </SidebarLayout>
    )
}

export default Products