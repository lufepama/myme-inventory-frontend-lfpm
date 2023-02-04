import React, { useContext } from 'react'
import WarehouseContext from '../context/WarehouseContext'
import Cookies from 'js-cookie'
import { getWarehouses } from '../helper/warehouse'


export const useWarehouse = () => {

    const { warehouseList, setWarehouseList } = useContext(WarehouseContext)

    const fetchWarehouses = async () => {
        const csrftoken = Cookies.get('csrftoken')
        if (csrftoken) {
            const res = await getWarehouses(csrftoken)
            if (res.success) {
                setWarehouseList(res.data)
            }
        }
    }

    return {
        warehouseList,
        fetchWarehouses
    }
}
