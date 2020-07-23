import loginService from '../services/login'

const storageKey = 'loggedBlogAppUser'

const loadUser = () =>
  JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () =>
  localStorage.removeItem(storageKey)

const loginUser = async ({ username, password }) => {
  try {
    const user = await loginService.login({
      username, password
    })
    localStorage.setItem(storageKey, JSON.stringify(user))
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export default {
  loadUser,
  loginUser,
  logoutUser
}