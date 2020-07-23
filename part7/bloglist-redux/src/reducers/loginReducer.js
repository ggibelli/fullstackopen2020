const reducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case 'LOCAL_STORAGE_LOGIN':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loginRedux = (data) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data
    })
  }
}

export const logout = () => (
  { type: 'LOGOUT' }
)

export const checkLocalStorage = (data) => {
  if (data) {
    return {
      type: 'LOCAL_STORAGE_LOGIN', 
      data
    }
  }
  return { type: 'DEFAULT'}
}

export default reducer