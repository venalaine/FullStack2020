import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personObject => {
    return axios.post(baseUrl, personObject)
}

export default {
    getAll: getAll, 
    create: create
}