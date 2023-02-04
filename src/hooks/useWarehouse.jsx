import React, { useContext } from 'react'
import WarehouseContext from '../context/WarehouseContext'
import Cookies from 'js-cookie'
import { getProductsWarehouse, getWarehouses } from '../helper/warehouse'


export const useWarehouse = () => {

    const { warehouseList, setWarehouseList,
        productsWarehouseList, setProductsWarehouseList,
        selectedWarehouse, setSelectedWarehouse
    } = useContext(WarehouseContext)

    const fetchProductsWarehouse = async (warehouseId) => {
        const csrftoken = Cookies.get('csrftoken')
        if (csrftoken) {
            const res = await getProductsWarehouse(warehouseId, csrftoken)
            console.log(res)
            if (res.success) {
                setProductsWarehouseList(res.data)
            }
        }
    }

    const fetchWarehouses = async () => {
        const csrftoken = Cookies.get('csrftoken')
        if (csrftoken) {
            const res = await getWarehouses(csrftoken)
            if (res.success) {
                setWarehouseList(res.data)
            }
        }
    }

    const updateSelectedWarehouse = (warehouse) => {
        setSelectedWarehouse(warehouse)
    }

    return {
        warehouseList,
        productsWarehouseList,
        selectedWarehouse,
        fetchWarehouses,
        fetchProductsWarehouse,
        updateSelectedWarehouse
    }
}
