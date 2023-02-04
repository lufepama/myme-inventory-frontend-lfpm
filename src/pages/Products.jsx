import React, { useEffect } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import ProductsTable from '../components/product/ProductsTable'
import { useProduct } from '../hooks/useProduct'
import DeleteModal from '../components/shared/DeleteModal'
import CreateProductModal from '../components/product/CreateProductModal'

const Products = () => {

    const { fetchProducts, productList, selectedProduct } = useProduct()

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <SidebarLayout>
            <div className='flex h-screen flex-col flex-col pl-14 pr-14'>
                <DeleteModal product={selectedProduct} />
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