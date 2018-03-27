import axios from 'axios'

export const authWithServer = () => axios.post('http://localhost:4000/data')
