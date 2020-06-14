import React from 'react';

const Filter = ({filter, handleFilter}) => (
    <div>
        filter name:<input 
          value={filter}
          onChange={handleFilter}
        />
      </div>
)

export default Filter