import React from 'react';

const Input = ({text, value, handleChange}) => (
  <div>
    {text}: <input 
      value={value}
      onChange={handleChange}
    />
  </div>
)

const PersonForm = ({addPerson, addInputs}) => (
  <form onSubmit={addPerson}>
    {addInputs.map(el => 
      <Input key={el.text} text={el.text} value={el.value} handleChange={el.handler}/>
    )}
    <div>
      <button type="submit">add</button>
    </div>
    
  </form>
)

export default PersonForm