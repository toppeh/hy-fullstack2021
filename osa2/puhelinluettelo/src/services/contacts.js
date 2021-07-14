import axios from 'axios'

const baseUrl = "/api/persons"

const create = (contact) => {
    const request = axios.post(`${baseUrl}`, contact)
    return request.then(response => response.data)
}

const destroy = (id) => {
    console.log(`${baseUrl}/${id}`);
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (contact) => {
    const request = axios.put(`${baseUrl}/${contact.id}`, contact)
    return request.then(response => response.data)
}






export default {create, destroy, update}