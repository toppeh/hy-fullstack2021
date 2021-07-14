import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const create = (contact) => {
    console.log(`${baseUrl}`);
    const request = axios.post(`${baseUrl}`, contact)
    return request.then(response => response.data)
}

const destroy = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (contact) => {
    const request = axios.put(`${baseUrl}/${contact.id}`, contact)
    return request.then(response => response.data)
}






export default {create, destroy, update}