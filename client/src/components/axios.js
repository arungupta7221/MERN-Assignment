import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Specify your backend URL here
})

export default instance
