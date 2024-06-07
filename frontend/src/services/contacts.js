import axios from 'axios'
const baseURL = 'https://fso-fullstack-phonebook-app-backend.vercel.app/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => {
        return response.data
    })
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
}

const deleteContact = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => {
        return response.data
    })
}

export default {getAll, create, update, deleteContact}