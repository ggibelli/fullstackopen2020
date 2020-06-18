import React from 'react'

const Input = ({filter, handleFilter}) => (
  <div>
    find countries <input 
      value={filter}
      onChange={handleFilter}
    />
  </div>
)

export default Input