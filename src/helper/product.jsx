import { API } from "../backend"


export const getProducts = async (token) => {
    return fetch(`${API}/product/get-products`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const createProduct = async (token, product) => {
    return fetch(`${API}/product/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(product)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const createProductWarehouse = async (token, data) => {
    return fetch(`${API}/wareproduct/create-product`, {
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

export const updateAmountProduct = async (token, data) => {
    return fetch(`${API}/wareproduct/update-product-amount`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const deleteProduct = async (token, productId) => {
    return fetch(`${API}/product/delete/${productId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const deleteProductWarehouse = async (token, warehouseProductId) => {
    return fetch(`${API}/wareproduct/delete-product/${warehouseProductId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

