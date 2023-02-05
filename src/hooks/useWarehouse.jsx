import React, { useContext } from 'react'
import WarehouseContext from '../context/WarehouseContext'
import Cookies from 'js-cookie'
import {
    getProductsWarehouse, getWarehouses,
    createWarehouse, deleteWarehouse, createProductMultipleWarehouses, deleteProductMultipleWarehouses
} from '../helper/warehouse'
import { useModals } from './useModals'
import { useProduct } from './useProduct'


export const useWarehouse = () => {

    const { warehouseList, setWarehouseList,
        productsWarehouseList, setProductsWarehouseList,
        selectedWarehouse, setSelectedWarehouse,
        warehouseStatus, setWarehouseStatus,
        temporalWarehouseList, setTemporalWarehouseList
    } = useContext(WarehouseContext)
    const { handleCloseCreateWarehouseModal, handleCloseDeleteModal } = useModals()
    const { selectedProduct } = useProduct()

    const csrftoken = Cookies.get('csrftoken')

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

    const onAddWarehouse = async (warehouse) => {

        if (csrftoken) {
            const res = await createWarehouse(csrftoken, warehouse)
            if (res.success) {
                const newWarehouse = res.data
                setWarehouseStatus({ isCreated: true, isDeleted: false })
                setWarehouseList([...warehouseList, newWarehouse])
                handleCloseCreateWarehouseModal()
            }
        }
    }

    const onDeleteWarehouse = async () => {
        handleCloseDeleteModal()
        if (csrftoken && Object.keys(selectedWarehouse).length != 0) {
            const res = await deleteWarehouse(csrftoken, selectedWarehouse.id)
            console.log({ res })
            if (res.success) {
                setWarehouseStatus({ isCreated: false, isDeleted: true })
                const filterdList = warehouseList.filter(item => item.id != selectedWarehouse.id)
                setWarehouseList(filterdList)
                handleCloseCreateWarehouseModal()
            }
        }
    }

    const updateSelectedWarehouse = (warehouse) => {
        setSelectedWarehouse(warehouse)
    }

    const updateTemporalWarehouseList = (warehouse, action) => {
        if (action == 'Add') {
            setTemporalWarehouseList([...temporalWarehouseList, warehouse])
        } else if (action == 'Del' && temporalWarehouseList.includes(warehouse)) {
            const filteredList = temporalWarehouseList.filter(item => item.id != warehouse.id)
            setTemporalWarehouseList(filteredList)
        }
    }

    const onAddDeleteProductMultipleWarehouse = async (action) => {
        let temporalWarehouseListId = []
        temporalWarehouseList.map(item => temporalWarehouseListId.push(item.id))

        if (csrftoken) {
            const formatData = {
                warehouseIdList: temporalWarehouseListId,
                productId: selectedProduct.id,
                amount: selectedProduct.amount
            }
            if (action == 'Add') {
                const res = await createProductMultipleWarehouses(csrftoken, formatData)
                console.log({ res })
            } else if (action == 'Del') {
                const res = await deleteProductMultipleWarehouses(csrftoken, formatData)
                console.log({ res })
            }

        }
    }


    return {
        warehouseList,
        productsWarehouseList,
        selectedWarehouse,
        warehouseStatus,
        temporalWarehouseList,
        fetchWarehouses,
        fetchProductsWarehouse,
        updateSelectedWarehouse,
        onAddWarehouse,
        onDeleteWarehouse,
        updateTemporalWarehouseList,
        onAddDeleteProductMultipleWarehouse
    }
}
