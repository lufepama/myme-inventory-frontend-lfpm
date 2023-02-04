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