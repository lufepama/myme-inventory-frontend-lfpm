import { API } from '../backend'

export const signup = async (data) => {

    return fetch(`${API}/user/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}


export const login = async (data) => {

    return fetch(`${API}/user/login`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}