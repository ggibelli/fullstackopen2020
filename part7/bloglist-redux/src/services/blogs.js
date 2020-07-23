import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const setConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, setConfig())
  return response.data
}

const comment = async (newComment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment, setConfig())
  return response.data
}

const update = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, setConfig())
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig())
  return response.data
}

export default { getAll, create, update, comment, remove }