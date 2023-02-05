import React, { useEffect, useState } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import ProductsTable from '../components/product/ProductsTable'
import { useProduct } from '../hooks/useProduct'
import DeleteModal from '../components/shared/DeleteModal'
import CreateProductModal from '../components/product/CreateProductModal'
import { useModals } from '../hooks/useModals'

const Products = () => {

    const { fetchProducts, productList,
        selectedProduct, onDeleteProduct
    } = useProduct()
    const { handleCloseDeleteModal } = useModals()
    const [query, setQuery] = useState('')
    const [filteredList, setFilteredList] = useState(productList)

    const handleInputChange = (e) => {
        setQuery(e.target.value)
        const results = productList.filter(product => {
            if (e.target.value == "") {
                return productList
            }
            return product?.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilteredList(results)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <SidebarLayout>
            <div className='flex h-screen flex-col flex-col pl-14 pr-14'>
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