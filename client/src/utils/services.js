import axios from 'axios';
import { BASE_URL,API_ENDPOINTS } from './environment';

/**
 * @method registerUser
 * @param {*} obj 
 */
const registerUser = (obj) => {
    const body = {
      name: obj.name, 
      email: obj.email, 
      expertise:obj.expertise,
      isAvailable: obj.isAvailable
    }
    const url = BASE_URL + API_ENDPOINTS.users;
    return axios.post(url,body)
    .then(response => {
        return response.data
    })
}

/**
 * @method loginUser
 * @param {*} obj 
 */
const updateAvailability = (obj) => {
    const body = {
        email: obj.email,
        isAvailable: obj.isAvailable
    }
    const url = BASE_URL + API_ENDPOINTS.updateAvailability;
    return axios.put(url,body)
    .then(response => {
        return response.data
    })
}



const getAllData = () => {
    const url = BASE_URL + API_ENDPOINTS.getAllData;
    return axios.get(url)
    .then(response => {
        return response.data
    })
}



export default {
    registerUser,
    updateAvailability,
    getAllData
}