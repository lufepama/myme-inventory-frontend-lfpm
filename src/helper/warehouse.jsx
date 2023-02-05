import { API } from "../backend"


export const getWarehouses = async (token) => {
    return fetch(`${API}/warehouse/get-warehouses`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const createWarehouse = async (token, warehouse) => {
    return fetch(`${API}/warehouse/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(warehouse)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const deleteWarehouse = async (token, warehouseId) => {
    return fetch(`${API}/warehouse/delete/${warehouseId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}




export const getProductsWarehouse = async (warehouseId, token) => {
    return fetch(`${API}/wareproduct/get-products/${warehouseId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const createProductMultipleWarehouses = async (token, data) => {
    return fetch(`${API}/wareproduct/create-multiple-product`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const deleteProductMultipleWarehouses = async (token, data) => {
    return fetch(`${API}/wareproduct/delete-multiple-product`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}
