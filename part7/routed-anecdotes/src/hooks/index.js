import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    event
      ? setValue(event.target.value)
      : setValue('')
  }

  return {
    type,
    value,
    onChange,
  }
}