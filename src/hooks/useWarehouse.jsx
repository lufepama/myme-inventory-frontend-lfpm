import React, { useContext } from 'react'
import WarehouseContext from '../context/WarehouseContext'
import Cookies from 'js-cookie'
import { getProductsWarehouse, getWarehouses, createWarehouse, deleteWarehouse } from '../helper/warehouse'
import { useModals } from './useModals'


export const useWarehouse = () => {

    const { warehouseList, setWarehouseList,
        productsWarehouseList, setProductsWarehouseList,
        selectedWarehouse, setSelectedWarehouse,
        warehouseStatus, setWarehouseStatus
    } = useContext(WarehouseContext)
    const { handleCloseCreateWarehouseModal, handleCloseDeleteModal } = useModals()

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

    return {
        warehouseList,
        productsWarehouseList,
        selectedWarehouse,
        warehouseStatus,
        fetchWarehouses,
        fetchProductsWarehouse,
        updateSelectedWarehouse,
        onAddWarehouse,
        onDeleteWarehouse
    }
}
