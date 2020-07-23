const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { 
        message: action.data.message,
        type: action.data.type 
      }
    case 'CLEAR_NOTIFICATION':
      return null
    default: 
      return state
  }
}

let timeoutId 

export const setNotification = (data, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default reducer