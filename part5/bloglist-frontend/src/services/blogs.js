import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setConfig = () => {
  return  {
    headers: { Authorization: token }
  }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  setConfig()
  const response = await axios.post(baseUrl, newObject, setConfig())
  return response.data
}

//const update = async newObject => {
  //const config = {}
//}

export default { getAll, create, setToken }