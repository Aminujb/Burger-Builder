import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-bbac9.firebaseio.com/'
})

export default instance;