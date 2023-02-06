import React, { useEffect, useContext } from 'react'
import ProductContext from '../context/ProductContext'
import { getProducts } from '../helper/product'
import Cookies from 'js-cookie'
import { createProduct, deleteProduct, deleteProductWarehouse } from '../helper/product'
import { useModals } from './useModals'
import { useWarehouse } from './useWarehouse'


export const useProduct = () => {

    //Destructuring data from context
    const { productList, setProductList,
        productStatus, setProductStatus,
        selectedProduct, setSelectedProduct
    } = useContext(ProductContext)
    const { handleCloseCreateProductModal, handleCloseDeleteModal } = useModals()

    const csrftoken = Cookies.get('csrftoken')

    //Methods

    const fetchProducts = async () => {
        if (csrftoken) {
            const res = await getProducts(csrftoken)
            if (res.success) {
                setProductList(res.data)
            }
        }
    }

    const onAddProduct = async (product) => {

        if (csrftoken) {
            const res = await createProduct(csrftoken, product)
            if (res.success) {
                const newProduct = res.data
                setProductStatus({ isCreated: true, isDeleted: false })
                setProductList([...productList, newProduct])
                handleCloseCreateProductModal()
            }
        }
    }

    const onDeleteProduct = async () => {

        if (csrftoken && Object.keys(selectedProduct).length != 0) {
            const res = await deleteProduct(csrftoken, selectedProduct.id)
            if (res.success) {
                setProductStatus({ isCreated: false, isDeleted: true })
                const filterdList = productList.filter(item => item.id != selectedProduct.id)
                setProductList(filterdList)
                handleCloseDeleteModal()
            }
        }
    }

    const updateSelectedProduct = (product) => {
        setSelectedProduct(product)
    }

    const resetSelectedProduct = () => {
        setSelectedProduct({})
    }

    const updateProductList = (productList) => {
        setProductList(productList)
    }

    const resetAlertMessages = () => {
        setProductStatus({
            isCreated: false,
            isDeleted: false
        })
    }


    return {
        productList,
        productStatus,
        selectedProduct,
        setSelectedProduct,
        fetchProducts,
        onAddProduct,
        onDeleteProduct,
        updateSelectedProduct,
        resetSelectedProduct,
        updateProductList,
        resetAlertMessages
    }
}