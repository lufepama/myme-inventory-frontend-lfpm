import React, { useEffect, useContext } from 'react'
import ProductContext from '../context/ProductContext'
import { getProducts } from '../helper/product'
import Cookies from 'js-cookie'

export const useProduct = () => {

    const { productList, setProductList } = useContext(ProductContext)


    const fetchProducts = async () => {
        const csrftoken = Cookies.get('csrftoken')
        if (csrftoken) {
            const res = await getProducts(csrftoken)
            if (res.success) {
                setProductList(res.data)
            }
        }
    }

    return {
        productList,
        fetchProducts
    }
}