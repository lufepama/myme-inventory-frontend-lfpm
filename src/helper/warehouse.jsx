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