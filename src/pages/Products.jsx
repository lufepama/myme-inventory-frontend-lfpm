import React, { useEffect } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import ProductsTable from '../components/product/ProductsTable'
import { useProduct } from '../hooks/useProduct'
import DeleteModal from '../components/shared/DeleteModal'
import CreateProductModal from '../components/product/CreateProductModal'

const Products = () => {

    const { fetchProducts } = useProduct()

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <SidebarLayout>
            <div className='flex flex-col pl-14 pr-14'>
                <DeleteModal />
                <CreateProductModal />
                <h1 className='font-bold text-3xl text-center'>Products</h1>
                <div>
                    <ProductsTable />
                </div>
            </div>
        </SidebarLayout>
    )
}

export default Products