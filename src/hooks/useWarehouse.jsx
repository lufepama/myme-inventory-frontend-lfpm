import React, { useContext } from 'react'
import WarehouseContext from '../context/WarehouseContext'
import Cookies from 'js-cookie'
import { getProductsWarehouse, getWarehouses, createWarehouse, deleteWarehouse } from '../helper/warehouse'
import { useModals } from './useModals'


export const useWarehouse = () => {

    const { warehouseList, setWarehouseList,
        productsWarehouseList, setProductsWarehouseList,
        selectedWarehouse, setSelectedWarehouse,
        warehouseStatus, setWarehouseStatus,
        temporalWarehouseList, setTemporalWarehouseList
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

    const updateTemporalWarehouseList = (warehouse, action) => {
        if (action == 'Add') {
            setTemporalWarehouseList([...temporalWarehouseList, warehouse])
        } else if (action == 'Del' && temporalWarehouseList.includes(warehouse)) {
            const filteredList = temporalWarehouseList.filter(item => item.id != warehouse.id)
            setTemporalWarehouseList(filteredList)
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
        updateTemporalWarehouseList
    }
}
