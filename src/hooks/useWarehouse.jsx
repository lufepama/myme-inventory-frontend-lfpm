import React, { useContext } from 'react'
import WarehouseContext from '../context/WarehouseContext'
import Cookies from 'js-cookie'
import {
    getProductsWarehouse, getWarehouses,
    createWarehouse, deleteWarehouse, createProductMultipleWarehouses, deleteProductMultipleWarehouses,

} from '../helper/warehouse'
import { deleteProductWarehouse, createProductWarehouse, updateAmountProduct } from '../helper/product'
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
                const newWarehouseData = res.data
                const fortmatNewWarehouse = {
                    ...newWarehouseData,
                    phoneNumber: newWarehouseData.phone_number
                }
                setWarehouseStatus({ isCreated: true, isDeleted: false })
                setWarehouseList([...warehouseList, fortmatNewWarehouse])
                handleCloseCreateWarehouseModal()
            }
        }
    }

    const onDeleteWarehouse = async () => {
        handleCloseDeleteModal()
        if (csrftoken && Object.keys(selectedWarehouse).length != 0) {
            const res = await deleteWarehouse(csrftoken, selectedWarehouse.id)
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

    const onAddDeleteProductMultipleWarehouse = async (action, amount = null) => {
        let temporalWarehouseListId = []
        temporalWarehouseList.map(item => temporalWarehouseListId.push(item.id))

        if (csrftoken) {
            const formatData = {
                warehouseIdList: temporalWarehouseListId,
                productId: selectedProduct.id,
                amount: amount
            }
            if (action == 'Add') {
                const res = await createProductMultipleWarehouses(csrftoken, formatData)
            } else if (action == 'Del') {
                const res = await deleteProductMultipleWarehouses(csrftoken, formatData)
            }

        }
    }

    const onAddDeleteProductWarehouse = async (action, amount = null) => {
        if (csrftoken && Object.keys(selectedProduct).length != 0) {
            if (action == 'Add') {
                const formatedData = {
                    warehouseId: selectedWarehouse.id,
                    productId: selectedProduct.id,
                    amount: amount
                }
                const res = await createProductWarehouse(csrftoken, formatedData)
                if (res.success) {

                    const newProductWarehouse = res.data

                    const filterList = productsWarehouseList.filter(el =>
                        el.product.id == selectedProduct.id
                    )
                    if (!filterList.length > 0) {
                        setWarehouseStatus({ isCreated: true, isDeleted: false })
                        setProductsWarehouseList([...productsWarehouseList, newProductWarehouse])
                    }
                }
            } else if (action == 'Del') {
                const res = await deleteProductWarehouse(csrftoken, selectedProduct.id)
                if (res.success) {
                    const filteredList = productsWarehouseList.filter(item => item.id != selectedProduct.id)
                    setProductsWarehouseList(filteredList)
                    handleCloseDeleteModal()
                }
            }
        }
    }

    const resetAlertMessages = () => {
        setWarehouseStatus({
            isCreated: false,
            isDeleted: false
        })
    }

    const resetTemporalWarehouseList = () => {
        setTemporalWarehouseList([])
    }

    const updateProductAmount = async (newAmount) => {
        const amount = parseInt(newAmount)
        if (csrftoken) {
            const filterdWrProduct = productsWarehouseList.filter(item => item.id === selectedProduct.id)[0]
            const formatedData = {
                wrProductId: filterdWrProduct.id,
                amount: amount
            }
            const res = await updateAmountProduct(csrftoken, formatedData)
            if (res.success) {
                setProductsWarehouseList(
                    productsWarehouseList.map(item => {
                        if (item.id === selectedProduct.id) {
                            return { ...item, product: { ...item.product, amount: amount } }
                        } else {
                            return item
                        }
                    })
                )
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
        onAddDeleteProductMultipleWarehouse,
        onAddDeleteProductWarehouse,
        resetAlertMessages,
        resetTemporalWarehouseList,
        updateProductAmount
    }
}
