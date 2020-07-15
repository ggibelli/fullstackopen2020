import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.visibility ? '' : 'none'
  }
  return (
    <div style={style}>
      {notification.data}
    </div>
  )
}

export default Notification