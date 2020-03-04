import axios from 'axios'

export const axiosWithAuth = () => {
    const token = localStorage.getItem('key')

    return axios.create({
        headers: {
            Authorization: `Token ${token}`
        }
    })
}