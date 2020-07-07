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
  const response = await axios.post(baseUrl, newObject, setConfig())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, setConfig())
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig())
  return response.data
}

export default { getAll, create, setToken, update, remove }